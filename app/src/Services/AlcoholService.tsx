import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler.tsx";
import {AlcoholGet} from "../Models/Alcohol.tsx";
import {SliderAlcoholPatch} from "../Models/Alcohol.tsx";

const api = "http://localhost:5131/api/";

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

export const UpdateAlcoholRatingsAPI = async (
    userName: string,
    type: number,
    ratings: { AlcoholId: string; rating: number }[],
    authToken?: string | null
) => {
    try {
        console.log("ahberkherh",ratings);

        const response = await axios.patch<SliderAlcoholPatch[]>(
            `${api}account/${userName}/${type}/ratings`,

            ratings,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        handleError(error);
    }
};