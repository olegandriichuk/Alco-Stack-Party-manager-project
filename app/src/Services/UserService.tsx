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
    phoneNumber?: string,
    address?: Address,
    gender?: number,
    authToken?: string
) => {
    try {
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
    photoFile?: File | null,
    formBackgroundFile?: File | null,
    authToken?: string
) => {
    try {
        const formData = new FormData();

        if (photoFile) {
            formData.append("PhotoFile", photoFile);
        }

        if (formBackgroundFile) {
            formData.append("FormBackgroundFile", formBackgroundFile);
        }

        const data = await axios.patch<UserProfile>(
            api + "account/updatePhoto",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return data;
    } catch (error) {
        handleError(error);
    }
}