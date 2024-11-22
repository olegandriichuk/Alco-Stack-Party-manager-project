import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PartyPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCopy } from '@fortawesome/free-solid-svg-icons';
import Disco from '../../assets/disco.svg';
import { GetPartyDetailAPI, UpdatePartyAPI, DeletePartyAPI } from '../../Services/PartyService.tsx';
import { GetAllAlcoholByRankListAPI, UpdateAllAlcoholsByRankAPI } from '../../Services/AlcoholService.tsx'; // Import the new service
import { PartyDetailGet, PartyDetailPut } from '../../Models/Party.tsx';
import { AlcoholGet } from '../../Models/Alcohol.tsx'; // Import the AlcoholGet type
import { useAuth } from '../../Context/useAuth.tsx';
import PartySettingsPopUp from '../../components/PartySettingsPopUp/PartySettingsPopUp.tsx';
import AlcoholList from '../../components/AlcoholCardList/AlcoholCardList';
import {CocktailGet, CocktailDetailsGet} from "../../Models/Cocktail.tsx";
import CocktailList from "../../components/CocktailCardList/CocktailCardList.tsx";
import { toast } from 'react-toastify';
//import LiquorRatingPopUp from "../AlcoRatingPopUp/LiquorRatingPopUP/LiquorRatingPopUP.tsx";
import {GetCocktailListAPI, GetCocktailDetailsAPI} from '../../Services/CocktailService.tsx';
import CocktailDetailsCard from "../../components/CocktailDetailsCard/CocktailDetailsCard.tsx";
import DescriptionPopUp from "../../components/DescriptionPopUp/DescriptionPopUp.tsx"; // Import the new component
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer.tsx';
import ViewAmountPopUp   from "../../components/ViewAmountPopUp/ViewAmountPopUp.tsx";
import SelectAlcoholPopUp from "../../components/SelectAlcoholPopUp/SelectAlcoholPopUp.tsx";
// PartyPage Component
const PartyPage: React.FC = () => {
    const { partyId } = useParams<{ partyId: string }>();
    const [party, setParty] = useState<PartyDetailGet | null>(null);
    const [alcohols, setAlcohols] = useState<AlcoholGet[]>([]); // State for alcohol data
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { token } = useAuth();
    const [cocktails, setCocktails] = useState<CocktailGet[]>([]);
    const [selectedCocktailDetails, setSelectedCocktailDetails] = useState<CocktailDetailsGet | null>(null);
    const [showDescription, setShowDescription] = useState(false);
    const [allowUpdates, setAllowUpdates] = useState(true);
    const [showSelectAmountPopUp, setShowSelectAmountPopUp] = useState(false); // State to control the modal visibility
    const [showViewAmountPopUp, setShowViewAmountPopUp] = useState(false);
    const [allowSelect, setAllowSelect] = useState(false); // State to control the button's enabled/disabled state
    const [isFinalState, setIsFinalState] = useState(false);
    const handleShowDescription = () => setShowDescription(true);
    const handleCloseDescription = () => setShowDescription(false);
    // Fetch party details when partyId changes
    useEffect(() => {
        const fetchPartyDetails = async () => {
            try {
                const response = await GetPartyDetailAPI(partyId!, token);
                setParty(response!.data);

                // Fetch alcohol details after party details are fetched
                // const alcoholResponse = await GetAllAlcoholByRankListAPI(partyId!, token);
                // setAlcohols(alcoholResponse!.data);
                await updateAlcoholData();
            } catch {
                setError('Failed to fetch party details');
            } finally {
                setLoading(false);
            }
        };
        fetchPartyDetails();
        //
        // const interval = setInterval(() => {
        //     updateAlcoholData();
        // }, 1000); // Обновление каждые 5 секунд
        //
        // // Очищаем интервал при размонтировании компонента
        // return () => clearInterval(interval);
    }, [partyId, token]);

    const handleOpenSelectAmount = () => {
        setShowSelectAmountPopUp(true);
    };

    // Function to close the SelectAlcoholPopUp
    const handleCloseSelectAmount = () => {
        setShowSelectAmountPopUp(false);
    };

    const handleOpenViewAmount = () => setShowViewAmountPopUp(true); // New function to open View Amount popup
    const handleCloseViewAmount = () => setShowViewAmountPopUp(false); // New function to close View Amount popup

    const handleTimerComplete = (state: "DEFAULT" | "PREPARATION" | "EXTRA_DAY" | "FINAL") => {
        console.log("State:", state);

        if (state === "DEFAULT") {
            console.log("Default state: blocking updates and disabling Select Amount.");
            setAllowUpdates(true);
            setAllowSelect(false);
            setIsFinalState(false);
        } else if (state === "PREPARATION") {
            console.log("Blocking updates during PREPARATION and EXTRA_DAY states.");
            setAllowUpdates(false); // Блокируем обновления
            setAllowSelect(true);
            setIsFinalState(false);
        } else if (state === "FINAL") {
            console.log("Final countdown reached. Event starts!");
            setAllowUpdates(false); // Оставляем блокировку в режиме FINAL
            setAllowSelect(false);
            setIsFinalState(true);
        }else if (state === "EXTRA_DAY") {
            console.log("Final countdown reached. Event starts!");
            setAllowUpdates(false); // Оставляем блокировку в режиме FINAL
            setAllowSelect(true);
            setIsFinalState(false);
        }
    };
// Function to update alcohol data
    const updateAlcoholData = async () => {
        try {
            const alcoholResponse = await GetAllAlcoholByRankListAPI(partyId!, token);
            console.log("Alcohol in Party: ", alcoholResponse);
            setAlcohols(alcoholResponse!.data); // Update state with new data
        } catch (error) {
            console.error("Failed to fetch alcohol data", error);
        }
    };

    const handleUpdateRanking = async () => {
        if (!allowUpdates) {
            console.log("Updates are disabled.");
            toast.error("Updates are not allowed during this period.");
            return;
        }

        try {

            const updatedAlcohols = await UpdateAllAlcoholsByRankAPI(party!.rankLimit, partyId!, token);

            if (updatedAlcohols) {
                setAlcohols(updatedAlcohols); // Update the alcohol list state
                toast.success("Alcohol rankings updated successfully!");
            } else {
                toast.error("Failed to update alcohol rankings");
            }
        } catch (error) {
            console.error("Error updating alcohol rankings:", error);
            toast.error("Failed to update alcohol rankings");
        }
    };

    const removeDuplicates = (cocktails: (CocktailGet | undefined)[]) => {
        const uniqueCocktails: CocktailGet[] = [];
        const seenIds = new Set<string>();

        for (let i = 0; i < cocktails.length; i++) {
            const currentCocktail = cocktails[i];
            if (currentCocktail && !seenIds.has(currentCocktail.id)) {
                uniqueCocktails.push(currentCocktail);
                seenIds.add(currentCocktail.id);
            }
        }

        return uniqueCocktails;
    };


    const handleViewCocktails = async () => {
        try {
            // const ingredientNames = alcohols.map((alcohol) => alcohol.name);
            // const ingredientNamesString = ingredientNames.join(", ");
            // console.log("Processing alcohol:");
            const cocktailPromises = alcohols.map(alcohol => {
                console.log("Processing alcohol:", alcohol.name); // Print the name of the alcohol
                return GetCocktailListAPI(partyId!, alcohol.name, token);
            });

// Wait for all API calls to complete
            const cocktailResponses = await Promise.all(cocktailPromises);

// Flatten the results into a single array of cocktails
            const combinedCocktails = cocktailResponses
                .flat(); // Flatten array if each response contains an array of cocktails

// Update the cocktails state with the combined results
            console.log("Processing cocktails:", combinedCocktails);

            //console.log("Fetching details for cocktail ID gggggg:", cocktails[0].Id);
            const filteredCocktails = removeDuplicates(combinedCocktails);
            setCocktails(filteredCocktails);
            console.log("Filtered cocktails:", filteredCocktails);
            if (filteredCocktails.length > 0) {
                toast.success("Cocktails loaded successfully!");
            }else {
                toast.error("Failed to load cocktails.");
            }
        } catch (error) {
            console.error("Error fetching cocktails:", error);
            toast.error("Failed to load cocktails");
        }
    };

    const handleCocktailDetails = async (id: string) => {
        try {

            console.log("Fetching details for cocktail ID:", id);
            const cocktailDetails = await GetCocktailDetailsAPI(id, token);
            if (cocktailDetails) {
                setSelectedCocktailDetails(cocktailDetails); // Save the selected cocktail details
            } else {
                toast.error('No details found for this cocktail.');
            }
        } catch (error) {
            console.error('Error fetching cocktail details:', error);
            toast.error('Failed to fetch cocktail details.');
        }
    };
    // Function to handle copying party ID
    const handleCopy = () => {
        const inputElement = document.getElementById("partyIdInput") as HTMLInputElement;
        inputElement.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const deleteParty = async () => {
        try {
            const response = await DeletePartyAPI(partyId!, token);
            console.log("TRY TO DELETE:", response);
            if (!response) {
                toast.error("Failed to delete party");
                return;
            }
            toast.success("Party deleted successfully!");
            window.location.href = "/home";
        } catch (error) {
            console.error("Failed to delete party", error);
            toast.error("Failed to delete party");
        }
    }

    // Handle save action from modal
    const handleSave = async (updatedParty: PartyDetailPut) => {
        if (!allowUpdates) {
            console.log("Party updates are disabled.");
            toast.error("Updates to the party details are not allowed during this period.");
            return;
        }
        try {
            const response = await UpdatePartyAPI(
                partyId!,
                updatedParty.name,
                updatedParty.description || "",
                updatedParty.date,
                updatedParty.preparationDate,
                updatedParty.photo || "",
                updatedParty.location || "",
                updatedParty.liquors,
                updatedParty.lowAlcohol,
                updatedParty.midAlcohol,
                updatedParty.highAlcohol,
                updatedParty.rankLimit,
                token
            );
            console.log("DATE RESPONSE:" , response);
            if (!response) {
                toast.error("Failed to update party");
                return;
            }
            setParty(prevParty => prevParty ? { ...prevParty, ...updatedParty } : null);
            //toast.success("Party updated successfully!");
            // localStorage.setItem("party", JSON.stringify(updatedParty));

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
        <div
            className="container-fluid p-0 d-flex flex-column align-items-start"
            style={{
                minHeight: '100vh',
                overflowY: 'auto',
                width: '100%',
                padding: '20px'
            }}
        >
             Countdown Timer
            {party?.preparationDate && (
                <CountdownTimer
                    preparationDate={party.preparationDate}
                    eventDate={party.date}
                    onTimerComplete={handleTimerComplete}
                    //allowAlcoholUpdate={allowAlcoholUpdate}
                />
            )}

            {/* Кнопка Select Amount */}
            <div className="mt-3">
                {isFinalState ? (
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleOpenViewAmount} // Open View Amount popup
                    >
                        View Amount
                    </button>
                ) : (
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleOpenSelectAmount} // Open Select Amount popup
                        disabled={!allowSelect} // Disable button if allowSelect is false
                    >
                        Select Amount
                    </button>
                )}


            {/* Select Amount PopUp */}
            <SelectAlcoholPopUp
                show={showSelectAmountPopUp}
                handleClose={handleCloseSelectAmount}
                alcohols={alcohols}
                partyId={partyId!}
            />

            {/* View Amount PopUp */}
                <ViewAmountPopUp
                    show={showViewAmountPopUp}
                    handleClose={handleCloseViewAmount}
                    partyId={partyId!} // Pass the party ID
                />


            </div>

            <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                    <img src={Disco} alt="Party Icon" width="80" height="80"/>
                    <div className="party-id-display ms-4">
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
                </div>

                {/* Party Description Button */}
                {/* Party Description Button */}
                <button
                    className="btn btn-outline-info"
                    style={{ position: 'absolute', top: '20px', right: '20px' }}
                    onClick={handleShowDescription}
                >
                    Party Description
                </button>
            </div>
            {/* Description PopUp */}
            {showDescription && (
                <DescriptionPopUp
                    description={party?.description || 'No description available'}
                    liquors={party!.liquors}
                    lowAlcohol={party!.lowAlcohol}
                    midAlcohol={party!.midAlcohol}
                    highAlcohol={party!.highAlcohol}
                    typesOfAlcohol={alcohols.length} // Number of alcohol types
                    onClose={handleCloseDescription}
                />
            )}
            {party && (
                <div className="party-details mt-4">
                    <h2>{party.name}</h2>
                    <p>{party.description}</p>
                    {party.photo && <img src={party.photo} alt="Party" className="party-photo" />}
                    <p>Date: {new Date(party.date).toLocaleDateString()}</p>
                    <p>Location: {party.location}</p>
                    <p>Liquors: {party.liquors ? "Yes" : "No"}</p>
                    <p>Low Alcohol: {party.lowAlcohol ? "Yes" : "No"}</p>
                    <p>Mid Alcohol: {party.midAlcohol ? "Yes" : "No"}</p>
                    <p>High Alcohol: {party.highAlcohol ? "Yes" : "No"}</p>
                    <p>Rank Limit: {party.rankLimit}</p>
                    <p>Created by me: {party.createdByMe ? "Yes" : "No"}</p>
                    {party.createdByMe && (
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Edit
                        </button>
                    )}
                    {party.createdByMe && (
                        <button className="btn btn-danger" onClick={deleteParty}>
                            Delete
                        </button>
                    )}
                </div>
            )}

            {alcohols.length > 0 && (
                <div className="mt-4">
                    <h3>Alcohols</h3>
                    <AlcoholList alcohols={alcohols} />
                    <button
                        className="btn btn-outline-primary mt-3"
                        onClick={handleUpdateRanking}
                    >
                        Update Alko Ranking
                    </button>
                </div>
            )}

            <div className="cocktails-section">
                <div className="view-cocktails-button">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleViewCocktails}
                    >
                        View Cocktails
                    </button>
                </div>
                <h3>Cocktails</h3>
                <CocktailList
                    cocktails={cocktails}
                    onClickCocktail={handleCocktailDetails} // Pass handler to CocktailList
                />
                {selectedCocktailDetails && (
                    <div>
                        <h3>Cocktail Details</h3>
                        <CocktailDetailsCard cocktail={selectedCocktailDetails} />
                    </div>
                )}
            </div>

            {party && (
                <PartySettingsPopUp
                    name={party.name}
                    description={party.description || ""}
                    date={party.date}
                    preparationDate={party.preparationDate}
                    photo={party.photo || ""}
                    location={party.location || ""}
                    liquors={party.liquors}
                    lowAlcohol={party.lowAlcohol}
                    midAlcohol={party.midAlcohol}
                    highAlcohol={party.highAlcohol}
                    rankLimit={party.rankLimit}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );

};

export default PartyPage;
