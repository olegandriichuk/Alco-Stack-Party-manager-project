import React, { useEffect, useState } from "react";
import { AlcoholVolume } from "../../Models/Alcohol.tsx";
import { GetPartyAlcoholVolumeAPI } from "../../Services/PartyService.tsx";
import { useAuth } from "../../Context/useAuth.tsx";
import { toast } from "react-toastify";

interface ViewAmountPopUpProps {
    show: boolean;
    handleClose: () => void;
    partyId: string; // Pass party ID to fetch alcohol volumes
}

const ViewAmountPopUp: React.FC<ViewAmountPopUpProps> = ({ show, handleClose, partyId }) => {
    const { token } = useAuth();
    const [alcoholVolumes, setAlcoholVolumes] = useState<AlcoholVolume[]>([]); // State to hold fetched alcohol volumes
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    useEffect(() => {
        if (show) {
            fetchAlcoholVolumes();
        }
    }, [show]);

    const fetchAlcoholVolumes = async () => {
        setLoading(true);
        try {
            const response = await GetPartyAlcoholVolumeAPI(partyId, token);
            if (response && response.data) {
                setAlcoholVolumes(response.data.alcoholVolume); // Assuming response contains alcoholVolume
            } else {
                setAlcoholVolumes([]);
                toast.error("Failed to fetch alcohol volumes.");
            }
        } catch (error) {
            console.error("Error fetching alcohol volumes:", error);
            toast.error("Error fetching alcohol volumes.");
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop-blur" onClick={handleClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <h3>View Total Alcohol Volumes</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {alcoholVolumes.length > 0 ? (
                                alcoholVolumes.map((alcohol, index) => (
                                    <li key={index}>
                                        <strong>{alcohol.name}</strong>: {alcohol.volume || 0}
                                    </li>
                                ))
                            ) : (
                                <p>No alcohol data available.</p>
                            )}
                        </ul>
                    )}
                    <button className="btn btn-secondary mt-3" onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAmountPopUp;