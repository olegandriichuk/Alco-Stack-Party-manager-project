import React, { useEffect, useState } from "react";
import { AlcoholVolume } from "../../Models/Alcohol.tsx";
import { GetPartyAlcoholVolumeAPI, CheckIsClickedAPI } from "../../Services/PartyService.tsx"; // Додайте новий API для перевірки
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
    const [isClicked, setIsClicked] = useState<boolean>(false); // Local isClicked state

    useEffect(() => {
        if (show) {
            checkIsClicked(); // Перевірка стану `isClicked` на бекенді
            fetchAlcoholVolumes();
        }
    }, [show]);

    const checkIsClicked = async () => {
        try {
            const response = await CheckIsClickedAPI(partyId, token); // Виклик API для перевірки стану
            if (response && response.data) {
                setIsClicked(response.data.isClicked);
            }
        } catch (error) {
            console.error("Error checking isClicked state:", error);
            toast.error("Failed to check isClicked state.");
        }
    };

    const fetchAlcoholVolumes = async () => {
        setLoading(true);
        try {

            const response = await GetPartyAlcoholVolumeAPI(partyId, isClicked, token); // Передаємо isClicked на бекенд
            if (response && response.data) {
                setAlcoholVolumes(response.data.alcoholVolume); // Припускаємо, що відповідь містить alcoholVolume
                if (!isClicked) {
                    // Якщо це перший клік, оновлюємо стан
                    setIsClicked(true);
                }
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

    const handleButtonClick = () => {
        fetchAlcoholVolumes(); // Виклик функції для оновлення обсягів
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
                    <button className="btn btn-primary mt-3" onClick={handleButtonClick}>
                        {isClicked ? "Refresh Volumes" : "Calculate Volumes"}
                    </button>
                    <button className="btn btn-secondary mt-3" onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAmountPopUp;
