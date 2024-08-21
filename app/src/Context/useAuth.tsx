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
    registerUser: (email: string, username: string, password: string, name: string, Surname: string, Phone: string, Address: Address, photoUrl: string, formBackgroundUrl: string) => void;
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

    const registerUser = async (email: string, username: string, password: string, name: string, Surname: string, Phone: string, Address: Address, photoUrl: string, formBackgroundUrl: string) => {
        try {
            const res = await registerAPI(email, username, password, name, Surname, Phone, Address, photoUrl, formBackgroundUrl);
            if (res) {
                const token = res.data.token;
                const userObj = {
                    userName: res.data.userName,
                    email: res.data.email,
                    name: res.data.name,
                    Surname: res.data.Surname,
                    Phone: res.data.Phone,
                    Address: res.data.Address,
                    photoUrl: res.data.photoUrl,
                    formBackgroundUrl: res.data.formBackgroundUrl,
                };

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userObj));

                setToken(token);
                setUser(userObj);

                toast.success("Registration successful!");
                navigate("/");
            }
        } catch {
            toast.warning("Server error occurred");
        }
    };

    const loginUser = async (username: string, password: string) => {
        try {
            const res = await loginAPI(username, password);
            if (res) {
                const token = res.data.token;
                const userObj = {
                    userName: res.data.userName,
                    email: res.data.email,
                };

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userObj));

                setToken(token);
                setUser(userObj);

                // toast.success("Login successful!");
                navigate("/home");
            }
        } catch {
            toast.warning("Server error occurred");
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
