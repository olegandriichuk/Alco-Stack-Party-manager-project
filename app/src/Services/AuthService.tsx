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
    phone: string,
    address: Address,
    photo: string,
    bio: string,
    formBackgroundUrl: string,
    gender: number, // Assuming gender is an enum index
    dateOfBirth: string // New parameter for date of birth
) => {
    try {
        // Post request with all parameters
        const data = await axios.post<UserProfileToken>(`${api}account/register`, {
            email: email,
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address,
            photo: photo,
            bio: bio,
            formBackgroundUrl: formBackgroundUrl,
            gender: gender,
            dateOfBirth: dateOfBirth
        });
        return data;
    } catch (error) {
        handleError(error); // Ensure handleError is defined or import it if it's from another file
    }
};
