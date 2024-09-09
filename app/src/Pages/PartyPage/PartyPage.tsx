// PartyPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PartyPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Disco from '../../assets/disco.svg';
import { GetPartyDetailAPI, UpdatePartyAPI } from "../../Services/PartyService.tsx";
import { PartyDetailGet, PartyDetailPut } from "../../Models/Party.tsx";
import { useAuth } from "../../Context/useAuth.tsx";
import PartySettingsPopUp from "../../components/PartySettingsPopUp/PartySettingsPopUp.tsx";
import { toast } from 'react-toastify';

// PartyPage Component
const PartyPage: React.FC = () => {
    const { partyId } = useParams<{ partyId: string }>();
    const [party, setParty] = useState<PartyDetailGet | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { token } = useAuth();

    // Fetch party details when partyId changes
    useEffect(() => {
        const fetchPartyDetails = async () => {
            try {
                const response = await GetPartyDetailAPI(partyId!, token);
                setParty(response!.data);
            } catch {
                setError('Failed to fetch party details');
            } finally {
                setLoading(false);
            }
        };
        fetchPartyDetails();
    }, [partyId, token]);

    // Function to handle copying party ID
    const handleCopy = () => {
        const inputElement = document.getElementById("partyIdInput") as HTMLInputElement;
        inputElement.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Handle save action from modal
    const handleSave = async (updatedParty: PartyDetailPut) => {
        try {
            const response = await UpdatePartyAPI(
                partyId!,
                updatedParty.name,
                updatedParty.description || "",
                updatedParty.date,
                updatedParty.photo || "",
                updatedParty.location || "",
                updatedParty.liquors,
                updatedParty.lowAlcohol,
                updatedParty.midAlcohol,
                updatedParty.highAlcohol,
                updatedParty.rankLimit,
                token
            );
            if (!response) {
                toast.error("Failed to update party");
                return;
            }
            setParty(prevParty => prevParty ? { ...prevParty, ...updatedParty } : null);
            //toast.success("Party updated successfully!");
            setShowModal(false);
        } catch (error) {
            console.error("Failed to update party", error);
            toast.error("Failed to update party");
        }
    };

    // If the data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there was an error fetching the party details
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-fluid p-0 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                    <img
                        src={Disco}
                        alt="Party Icon"
                        width="80"
                        height="80"
                    />
                </div>

                <div className="party-id-display mt-4">
                    <div className="input-group">
                        <input
                            id="partyIdInput"
                            type="text"
                            value={partyId}
                            readOnly
                            className="form-control"
                            aria-label="Party ID"
                        />
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleCopy}
                            aria-label="Copy Party ID"
                        >
                            <FontAwesomeIcon icon={faCopy} />
                        </button>
                    </div>
                    {copied && <small className="text-success mt-2">Copied!</small>}
                </div>
                <Link to={"/home"} className="p-2" aria-label="Go to Home Page">
                    <FontAwesomeIcon icon={faHome} size="2x" color="black" />
                </Link>
            </div>

            {/* Display the party details */}
            {party && (
                <div className="party-details mt-4">
                    <h2>{party.name}</h2>
                    <p>{party.description}</p>
                    {party.photo && (
                        <img src={party.photo} alt="Party" className="party-photo" />
                    )}
                    <p>Date: {new Date(party.date).toLocaleDateString()}</p>
                    <p>Location: {party.location}</p>
                    <p>Liquors: {party.liquors ? "Yes" : "No"}</p>
                    <p>Low Alcohol: {party.lowAlcohol ? "Yes" : "No"}</p>
                    <p>Mid Alcohol: {party.midAlcohol ? "Yes" : "No"}</p>
                    <p>High Alcohol: {party.highAlcohol ? "Yes" : "No"}</p>
                    <p>Rank Limit: {party.rankLimit}</p>
                    <p>Created by me: {party.createdByMe ? "Yes" : "No"}</p>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Edit</button>
                </div>
            )}

            {/* Party Settings PopUp Modal */}
            {party && (
                <PartySettingsPopUp
                    name={party.name}
                    description={party.description || ""}
                    date={party.date}
                    photo={party.photo || ""}
                    location={party.location || ""}
                    liquors={party.liquors}
                    lowAlcohol={party.lowAlcohol}
                    midAlcohol={party.midAlcohol}
                    highAlcohol={party.highAlcohol}
                    rankLimit={party.rankLimit}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave} // Ensure this prop is passed
                />
            )}
        </div>
    );
};

export default PartyPage;
