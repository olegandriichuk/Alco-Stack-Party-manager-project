import { createContext, useEffect, useState } from "react";
import {Address, UserProfile} from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (
        email: string,
        userName: string,
        password: string,
        firstName?: string,
        lastName?: string,
        phoneNumber?: string,
        address?: Address,
        photo?: string,
        bio?: string,
        formBackgroundUrl?: string,
        gender?: number,
        dateOfBirth?: string
    ) => void;
    updateUser: (UserProfile: UserProfile) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};



type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        email: string,
        username: string,
        password: string,
        firstName: string = "",
        lastName: string = "",
        phoneNumber: string = "",
        address: Address = {},
        photo: string = "",
        bio: string = "",
        formBackgroundUrl: string = "",
        gender: number = 0,
        dateOfBirth: string = ""
    ) => {


        const userObj = {
            email,
            username,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            photo,
            bio,
            formBackgroundUrl,
            gender,
            dateOfBirth
        };

        console.group("API Request Data: Register User");
        console.log("Endpoint: /register");
        console.log("Payload:", userObj);
        console.groupEnd();

        try {
            const res = await registerAPI(
                email,
                username,
                password,
                firstName,
                lastName,
                phoneNumber,
                address,
                photo,
                bio,
                formBackgroundUrl,
                gender,
                dateOfBirth
            );

            console.group("API Response Data: Register User");
            console.log("Response:", res?.data);
            console.groupEnd();

            if (res) {
                const { token, userName, email, firstName, lastName, phoneNumber, address, photo, formBackgroundUrl, bio, gender, dateOfBirth } = res.data;

                const userObj = {
                    userName: userName,
                    email: email,
                    firstName: firstName ?? "",
                    lastName: lastName ?? "",
                    phoneNumber: phoneNumber ?? "",
                    address: address ?? {},
                    photo: photo ?? "",
                    formBackgroundUrl: formBackgroundUrl ?? "",
                    bio: bio ?? "",
                    gender: gender ?? 0,
                    dateOfBirth: dateOfBirth ?? ""
                };

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userObj));

                setToken(token);
                setUser(userObj);

                toast.success("Registration successful!");
                navigate("/");
            }
        } catch (error) {
            toast.warning("Server error occurred");
            console.error("Registration error:", error);
        }
    };

    const loginUser = async (username: string, password: string) => {
        // console.group("API Request Data: Login User");
        // console.log("Endpoint: /login");
        // console.log("Payload:", { username, password });
        // console.groupEnd();

        try {
            const res = await loginAPI(username, password);

            console.group("API Response Data: Login User");
            console.log("Response:", res?.data);
            console.groupEnd();

            if (res) {
                const token = res.data.token;
                const userObj = {
                    userName: res.data.userName,
                    email: res.data.email,
                    firstName: res.data.firstName ?? "",
                    lastName: res.data.lastName ?? "",
                    phoneNumber: res.data.phoneNumber ?? "",
                    address: res.data.address ?? {},
                    photo: res.data.photo ?? "",
                    formBackgroundUrl: res.data.formBackgroundUrl ?? "",
                    bio: res.data.bio ?? "",
                    gender: res.data.gender ?? 2,
                    dateOfBirth: res.data.dateOfBirth ?? ""
                };

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userObj));

                setToken(token);
                setUser(userObj);
                console.log("UserObj");
                console.log(userObj);


                navigate("/home");
            }
        } catch (error) {
            toast.warning("Server error occurred");
            console.error("Login error:", error);
        }
    };

    const updateUser = (user: UserProfile) => {

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ loginUser, updateUser, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
