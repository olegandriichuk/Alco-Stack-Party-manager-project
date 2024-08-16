import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage.tsx";
import WelcomePage  from "../Pages/WelcomePage/WelcomePage.tsx";
import App from "../App.tsx";
import ProfilePage from "../Pages/ProfilePage/ProfilePage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {   path: "/",
                element: <HomePage />,
            },
            {
                path: "/welcome",
                element: <WelcomePage />,
            },
            {
                path: "/profile",
                element: <ProfilePage
                    userPhotoUrl="https://example.com/path-to-user-photo.jpg"
                    formBackgroundUrl="https://example.com/path-to-form-background.jpg"
                />
            }
        ]
    }
]);