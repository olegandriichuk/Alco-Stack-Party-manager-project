import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage.tsx";
import WelcomePage from "../Pages/WelcomePage/WelcomePage.tsx";
import App from "../App.tsx";
import ProfilePage from "../Pages/ProfilePage/ProfilePage.tsx";
//import LoginPage from "../Pages/LoginPage/LoginPage.tsx";
//import ProtectedRoute from "./ProtectedRoutes.tsx";
import ProfileEditRoute from "./ProfileEditRoute";
import LowAlcoPage from "../Pages/AlcoRatingPages/LowAlcoPage/LowAlcoPage.tsx"; // Import the newly created component
//import RegisterPage from "../Pages/RegisterPage/RegisterPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // {
            //     path: "/",
            //     element: <LoginPage />,
            // },
            // {
            //     path: "/register",
            //     element: <RegisterPage />,
            // },
            {
                path: "/home",
                element: (
//                    <ProtectedRoute>
                        <HomePage />
//                    </ProtectedRoute>
                ),
            },
            {
                path: "/welcome",
                element: (
 //                   <ProtectedRoute>
                        <WelcomePage />
 //                   </ProtectedRoute>
                ),
            },
            {
                path: "/profile/low-alco",
                element:
                                  //    <ProtectedRoute>
                                        <LowAlcoPage />
                                    //   </ProtectedRoute>

            },
            {
                path: "/profile",
                element: (
 //                   <ProtectedRoute>
                        <ProfilePage />
   //                 </ProtectedRoute>
                ),
            },
            {
                path: "/profile/edit",
                element: <ProfileEditRoute />, // Use the component that provides dynamic user data
            },
        ],
    },
]);

export default router;
