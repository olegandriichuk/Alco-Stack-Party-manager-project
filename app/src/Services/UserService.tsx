import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler.tsx";
import {UserProfile, Address} from "../Models/User.tsx";

const api = "http://localhost:5131/api/";

export const UpdateProfileAPI = async (
    email: string,
    userName: string,
    firstName?: string,
    lastName?: string,
    bio?: string,
    dateOfBirth?: string,
    photo?: string,
    phone?: string,
    address?: Address,
    fromBackgroundUrl?: string,
    gender?: number,
    authToken?: string
) => {
    try {
        // console.log("Token:", authToken);
        const data = await axios.put<UserProfile>(
            api+"account/update",
            {
                email: email,
                username: userName,
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                dateOfBirth: dateOfBirth,
                photo: photo,
                phone: phone,
                address: address,
                fromBackgroundUrl: fromBackgroundUrl,
                gender: gender

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