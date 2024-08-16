import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage.tsx";
import WelcomePage  from "../Pages/WelcomePage/WelcomePage.tsx";
import App from "../App.tsx";

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
            }
        ]
    }
]);