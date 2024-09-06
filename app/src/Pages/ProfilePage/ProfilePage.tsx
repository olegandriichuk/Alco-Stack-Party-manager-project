import './ProfilePage.css';
import ProfileCard from "../../components/ProfileCard/ProfileCard.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Disco from '../../assets/disco.svg';
import { useAuth } from "../../Context/useAuth.tsx";
import ChooseAlcoButtonList from '../../components/СhooseAlcoButtonList/ChooseAlcoButtonList';
import Beer from '../../assets/beer.png'
import React from "react";

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    const alcoButtons = [
        { text: 'Low-Alco', icon: Beer, color: '#D9D9D9', link: '/profile/low-alco' },
        { text: 'Low-Alco', icon: Beer, color: '#D9D9D9', link: '/profile/low-alco' },
        { text: 'Low-Alco', icon: Beer, color: '#D9D9D9', link: '/profile/low-alco' },
        { text: 'Low-Alco', icon: Beer, color: '#D9D9D9', link: '/profile/low-alco' }
    ];
    return (
        <div className="container-fluid p-0 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                    <img
                        src={Disco}
                        alt="Party Icon"
                        width="80"
                        height="80"
                    />
                </div>
                <Link to={"/home"} className="p-2" aria-label="Go to Home Page">
                    <FontAwesomeIcon icon={faHome} size="2x" color="black" />
                </Link>
            </div>

            <ProfileCard
                UserName={user?.userName || ""}
                name={user?.firstName || ""}
                Surname={user?.lastName || ""}
                Phone={user?.phoneNumber || ""}
                Email={user?.email || ""}
                Gender={user?.gender || 0}
                photoUrl={user?.photo || ""}
                formBackgroundUrl={user?.formBackgroundUrl || ""}
            />
            <ChooseAlcoButtonList alcoButtons={alcoButtons} />
        </div>
    );
}

export default ProfilePage;
