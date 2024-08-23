import { createContext, useEffect, useState } from "react";
import { Address, UserProfile, DateOfBirth } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

function formatDateOfBirth(dateOfBirth: DateOfBirth): string {
    const { year, month, day } = dateOfBirth;

    // Ensure month and day are two digits by padding with zeros if necessary
    const monthString = month.toString().padStart(2, '0');
    const dayString = day.toString().padStart(2, '0');

    return `${year}-${monthString}-${dayString}`;
}


type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (
        email: string,
        username: string,
        password: string,
        firstName?: string,
        lastName?: string,
        phone?: string,
        address?: Address,
        photo?: string,
        bio?: string,
        formBackgroundUrl?: string,
        gender?: number,
        dateOfBirth?: DateOfBirth
    ) => void;
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
        phone: string = "",
        address: Address = {},
        photo: string = "",
        bio: string = "",
        formBackgroundUrl: string = "",
        gender: number = 0,
        dateOfBirth: DateOfBirth = { year: 0, month: 0, day: 0, dayOfWeek: "" }
    ) => {
        const formattedDateOfBirth = formatDateOfBirth(dateOfBirth);

        const userObj = {
            email,
            username,
            password,
            firstName,
            lastName,
            phone,
            address,
            photo,
            bio,
            formBackgroundUrl,
            gender,
            dateOfBirth: formattedDateOfBirth,
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
                phone,
                address,
                photo,
                bio,
                formBackgroundUrl,
                gender,
                formattedDateOfBirth
            );

            console.group("API Response Data: Register User");
            console.log("Response:", res?.data);
            console.groupEnd();

            if (res) {
                const { token, username, email, firstName, lastName, phone, address, photo, formBackgroundUrl, bio, gender, dateOfBirth } = res.data;

                const userObj = {
                    userName: username,
                    email: email,
                    name: firstName ?? "",
                    surname: lastName ?? "",
                    phone: phone ?? "",
                    address: address ?? {},
                    photoUrl: photo ?? "",
                    formBackgroundUrl: formBackgroundUrl ?? "",
                    bio: bio ?? "",
                    gender: gender ?? 0,
                    dateOfBirth: dateOfBirth ?? { year: 0, month: 0, day: 0, dayOfWeek: "" }
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
        console.group("API Request Data: Login User");
        console.log("Endpoint: /login");
        console.log("Payload:", { username, password });
        console.groupEnd();

        try {
            const res = await loginAPI(username, password);

            console.group("API Response Data: Login User");
            console.log("Response:", res?.data);
            console.groupEnd();

            if (res) {
                const token = res.data.token;
                const userObj = {
                    userName: res.data.username,
                    email: res.data.email,
                };

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userObj));

                setToken(token);
                setUser(userObj);

                navigate("/home");
            }
        } catch (error) {
            toast.warning("Server error occurred");
            console.error("Login error:", error);
        }
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
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
