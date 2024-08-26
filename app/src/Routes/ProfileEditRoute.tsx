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
            <EditProfilePage
                UserName={user.userName}
                name="John"
                Surname="Doe"
                Phone="+1234567890"
                Email={user.email}
                Address={{ Country: "Country", Town: "Town", Street: "Street", ZipCode: "ZipCode" }}
                photoUrl="https://randomuser.me/api/portraits/men/3.jpg"
                formBackgroundUrl="https://images.cloudflareapps.com/ZAotxLiSkmDIeCENOzgQ_background-3.jpeg"
            />
        </ProtectedRoute>
    );
};

export default ProfileEditRoute;
