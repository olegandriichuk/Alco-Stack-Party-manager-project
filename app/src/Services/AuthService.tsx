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

export const registerAPI = async (
    email: string,
    username: string,
    password: string,
    name: string,
    Surname: string,
    Phone: string,
    Address: Address,
    photoUrl: string,
    formBackgroundUrl: string
) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            username: username,
            password: password,
            name: name,
            Surname: Surname,
            Phone: Phone,
            Address: Address,
            photoUrl: photoUrl,
            formBackgroundUrl: formBackgroundUrl,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

// export const getUserProfileAPI = async (token: string) => {
//     try {
//         const data = await axios.get<UserProfileToken>(api + "account/profile", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return data;
//     } catch (error) {
//         handleError(error);
//     }
// };