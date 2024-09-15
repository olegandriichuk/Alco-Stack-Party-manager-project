import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler.tsx";
import {UserProfile, Address} from "../Models/User.tsx";

const api = "https://localhost:7136/api/";

export const UpdateProfileAPI = async (
    email: string,
    userName: string,
    firstName?: string,
    lastName?: string,
    bio?: string,
    dateOfBirth?: string,
    // photo?: string,z
    phoneNumber?: string,
    address?: Address,
    // formBackgroundUrl?: string,
    gender?: number,
    authToken?: string
) => {
    try {
        // console.log("forggfmBackgroundUrl", formBackgroundUrl);
        const data = await axios.put<UserProfile>(
            api+"account/update",
            {
                email: email,
                username: userName,
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                dateOfBirth: dateOfBirth,
                // photo: photo,
                phoneNumber: phoneNumber,
                address: address,
                // formBackgroundUrl: formBackgroundUrl,
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

export const UpdatePhotoAPI = async (
    photo?: string,
    formBackgroundUrl?: string,
    authToken?: string
) => {
    try {
        const data = await axios.patch<UserProfile>(
            api+"account/updatePhoto",
            {
                photo: photo,
                formBackgroundUrl: formBackgroundUrl,
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