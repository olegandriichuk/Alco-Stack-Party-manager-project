import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage.tsx";
import WelcomePage from "../Pages/WelcomePage/WelcomePage.tsx";
import App from "../App.tsx";
import ProfilePage from "../Pages/ProfilePage/ProfilePage.tsx";
import EditProfilePage from "../Pages/EditProfilePage/EditProfilePage.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage.tsx";
import ProtectedRoute from "./ProtectedRoutes.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/home",
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/welcome",
                element: (
                    <ProtectedRoute>
                        <WelcomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile/edit",
                element: (
                    <ProtectedRoute>
                        <EditProfilePage
                            UserName="johndoe"
                            name="John"
                            Surname="Doe"
                            Phone="+1234567890"
                            Email="email@example.com"
                            Address={{ Country: "Country", Town: "Town", Street: "Street", ZipCode: "ZipCode" }}
                            photoUrl="https://randomuser.me/api/portraits/men/3.jpg"
                            formBackgroundUrl="https://images.cloudflareapps.com/ZAotxLiSkmDIeCENOzgQ_background-3.jpeg"
                        />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default router;
