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
                phoneNumber: phoneNumber,
                address: address,
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
    photoChanged: boolean,
    formBackgroundChanged: boolean,
    photoFile?: File | null,
    formBackgroundFile?: File | null,
    authToken?: string
) => {
    try {
        const formData = new FormData();
        // Append the boolean attributes as strings or numbers
        formData.append("PhotoChanged", JSON.stringify(photoChanged));
        formData.append("FormBackgroundChanged", JSON.stringify(formBackgroundChanged));
        // Append the file data
        if (photoFile) {
            formData.append("PhotoFile", photoFile);
        }

        if (formBackgroundFile) {
            formData.append("FormBackgroundFile", formBackgroundFile);
        }

        // Send the request
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
