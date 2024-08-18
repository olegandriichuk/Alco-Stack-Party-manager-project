import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage.tsx";
import WelcomePage from "../Pages/WelcomePage/WelcomePage.tsx";
import App from "../App.tsx";
import ProfilePage from "../Pages/ProfilePage/ProfilePage.tsx";
import EditProfilePage from "../Pages/EditProfilePage/EditProfilePage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/welcome",
                element: <WelcomePage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/profile/edit",
                element: <EditProfilePage
                    UserName="johndoe"
                    name="John"
                    Surname="Doe"
                    Phone="+1234567890"
                    Email="email@example.com"
                    Address={{Country: "Country", Town: "Town", Street: "Street", ZipCode: "ZipCode"}}
                    photoUrl="https://randomuser.me/api/portraits/men/3.jpg"
                    formBackgroundUrl="https://images.cloudflareapps.com/ZAotxLiSkmDIeCENOzgQ_background-3.jpeg"
                />
            }
        ]
    }
]);