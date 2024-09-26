import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler.tsx";
import {AlcoholGet} from "../Models/Alcohol.tsx";

const api = "https://localhost:7136/api/";

export const GetAlcoholRankListAPI = async (partyId: string, rankLink: number, authToken?: string | null) => {
    try {
        const data = await axios.get<AlcoholGet[]>(
            `${api}alcohol/${partyId}/limitByRank/${rankLink}`,
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

export const GetAllAlcoholByRankListAPI = async (partyId: string, authToken?: string | null) => {
    try {
        const data = await axios.get<AlcoholGet[]>(
            `${api}alcohol/${partyId}/allByRank`,
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