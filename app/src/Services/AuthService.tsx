import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler.tsx";
import { UserProfileToken } from "../Models/User.tsx";
import { Address } from "../Models/User.tsx";

const api = "http://localhost:5131/api/";


export const loginAPI = async (username: string, password: string) => {
    try {

        const data = await axios.post<UserProfileToken>(api + "account/login", {
            username: username,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};


// Adjust the function signature to include new parameters
export const registerAPI = async (
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: Address,
    bio: string,
    gender: number,
    dateOfBirth: string
) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}account/register`, {
            email: email,
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: address,
            bio: bio,
            gender: gender,
            dateOfBirth: dateOfBirth
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};
