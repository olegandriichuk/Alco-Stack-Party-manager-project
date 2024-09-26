import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler.tsx";
import {PartyListGet, PartyPost, PartyDetailGet} from "../Models/Party.tsx";

const api = "https://localhost:7136/api/";

export const CreatePartyAPI = async (
    name: string,
    description: string,
    date: string,
    photo: string,
    location: string,
    creatorUserName?: string,
    authToken?: string | null
) => {
    try {
        const data = await axios.post<PartyPost>(
            api+"party/create",
            {
                name: name,
                description: description,
                date: date,
                photo: photo,
                location: location,
                creatorUserName: creatorUserName
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const JoinPartyAPI = async (
    partyId: string,
    authToken?: string | null
) => {
    try {
        const data = await axios.post(
            `${api}party/${partyId}/add-user`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const GetPartyListAPI = async (authToken?: string | null) => {
    try {
        const data = await axios.get<PartyListGet[]>(
            `${api}party/userParties`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const GetPartyDetailAPI = async (
    partyId: string,
    authToken?: string | null
) => {
    try {
        const data = await axios.get<PartyDetailGet>(
            `${api}party/${partyId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};


export const UpdatePartyAPI = async (
    partyId: string,
    name?: string,
    description?: string,
    date?: string,
    photo?: string,
    location?: string,
    liquors?: boolean,
    lowAlcohol?: boolean,
    midAlcohol?: boolean,
    highAlcohol?: boolean,
    rankLimit?: number,
    authToken?: string | null
) => {
    try {
        const data = await axios.put<PartyDetailGet>(
            `${api}party/${partyId}`,
            {
                name: name,
                description: description,
                date: date,
                photo: photo,
                location: location,
                liquors: liquors,
                lowAlcohol: lowAlcohol,
                midAlcohol: midAlcohol,
                highAlcohol: highAlcohol,
                rankLimit: rankLimit
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const DeletePartyAPI = async (
    partyId: string,
    authToken?: string | null
) => {
    try {
        const data = await axios.delete(
            `${api}party/${partyId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};


