import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler.tsx";
import {CocktailDetailsGet, CocktailGet} from "../Models/Cocktail.tsx";

const api = "http://localhost:5131/api/";

export const GetCocktailListAPI = async (partyId: string,ingredient: string,authToken?: string | null ) => {
    try {
        const response = await axios.get<CocktailGet[]>(
            `${api}cocktail/ingredient/${partyId}/${ingredient}`, // Updated URL
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        console.log("Cocktails:", response.data); // Log the response data
        return response.data; // Return only the data, not the full response
    } catch (error) {

        handleError(error);
    }
};

export const GetCocktailDetailsAPI = async (id : string,authToken?: string | null ) => {
    try {
        console.log("Requesting cocktails details...");
        console.log("Cocktail id:", id);
        const response = await axios.get<CocktailDetailsGet>(
            `${api}cocktail/details/${id}`, // Updated URL
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        console.log("Cocktail details:", response.data); // Log the response data
        console.log("Cocktail ingredients bbbbbbb:", response.data.ingredients);
        return response.data; // Return only the data, not the full response
    } catch (error) {

        handleError(error);
    }
};