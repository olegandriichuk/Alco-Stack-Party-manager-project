import { useAuth } from "../Context/useAuth.tsx";
import EditProfilePage from "../Pages/EditProfilePage/EditProfilePage.tsx"; // Adjust the path as needed
import ProtectedRoute from "./ProtectedRoutes.tsx";

const ProfileEditRoute = () => {
    const { user } = useAuth();

    // Ensure user data is loaded before rendering the component
    if (!user) {
        return <div>Loading...</div>; // You can customize this part (e.g., add a loading spinner)
    }

    return (
        <ProtectedRoute>
            <EditProfilePage/>
        </ProtectedRoute>
    );
};

export default ProfileEditRoute;
