import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/useAuth.tsx";
import { toast } from "react-toastify";
import AlcoVolumeSliderList from "../AlcoVolumeSliderList/AlcoVolumeSliderList.tsx";
import { UpdateAlcoholVolumeAPI } from "../../Services/UserService.tsx";
import { PartyUserAlcohol } from "../../Models/Party.tsx";
import { AlcoholVolume } from "../../Models/Alcohol.tsx";

interface SelectAlcoholPopUpProps {
    show: boolean;
    handleClose: () => void;
    alcohols: AlcoholVolume[]; // Alcohols list with volumes
    partyId: string; // Party ID
}

const SelectAlcoholPopUp: React.FC<SelectAlcoholPopUpProps> = ({
                                                                   show,
                                                                   handleClose,
                                                                   alcohols,
                                                                   partyId,
                                                               }) => {
    const { token } = useAuth();
    const [updatedAlcohols, setUpdatedAlcohols] = useState<AlcoholVolume[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    // Загрузка значень з localStorage
    useEffect(() => {
        if (show) {
            const savedVolumes = localStorage.getItem(`party-${partyId}-volumes`);
            if (savedVolumes) {
                setUpdatedAlcohols(JSON.parse(savedVolumes));
            } else {
                setUpdatedAlcohols(alcohols);
            }
        }
    }, [show, alcohols, partyId]);

    const handleVolumeChange = (name: string, newVolume: number) => {
        setUpdatedAlcohols((prev) =>
            prev.map((alcohol) =>
                alcohol.name === name
                    ? { ...alcohol, volume: newVolume }
                    : alcohol
            )
        );
    };

    const saveVolumes = async () => {
        setIsSaving(true);
        try {
            // Prepare the payload
            const payload: PartyUserAlcohol = {
                alcoholVolume: updatedAlcohols.map((alcohol) => ({
                    name: alcohol.name, // Retain only the `name`
                    volume: alcohol.volume, // Retain only the `volume`
                })),
            };

            // Send updated alcohol volumes to the API
            const response = await UpdateAlcoholVolumeAPI(partyId, payload, token!);

            if (response) {
                // Збереження значень у localStorage
                localStorage.setItem(
                    `party-${partyId}-volumes`,
                    JSON.stringify(updatedAlcohols)
                );

                toast.success("Alcohol volumes updated successfully!");
                handleClose();
            } else {
                throw new Error("Failed to save alcohol volumes.");
            }
        } catch (error) {
            console.error("Failed to save alcohol volumes:", error);
            toast.error("Failed to save alcohol volumes. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!show) {
        return null; // Do not render if the modal is not visible
    }

    return (
        <>
            <div className="modal-backdrop-blur" onClick={handleClose} />
            <div className="modal-container">
                <div className="modal-content">
                    <h3>Select Alcohol Volumes</h3>
                    <AlcoVolumeSliderList
                        sliders={updatedAlcohols.map((alcohol) => ({
                            label: alcohol.name, // Replace with the alcohol's name if available
                            value: alcohol.volume ?? 0, // Use 0 as a fallback when volume is undefined
                            onChange: (newVolume) =>
                                handleVolumeChange(alcohol.name, newVolume),
                        }))}
                    />
                    <button
                        className="btn-save"
                        onClick={saveVolumes}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SelectAlcoholPopUp;
