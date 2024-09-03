import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler.tsx";
import { PartyPost } from "../Models/Party.tsx";

const api = "http://localhost:5131/api/";

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