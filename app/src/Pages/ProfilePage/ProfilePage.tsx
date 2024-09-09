import './ProfilePage.css';
import ProfileCard from "../../components/ProfileCard/ProfileCard.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Disco from '../../assets/disco.svg';
import { useAuth } from "../../Context/useAuth.tsx";
import ChooseAlcoButtonList from '../../components/СhooseAlcoButtonList/ChooseAlcoButtonList';
import Beer from '../../assets/beer.png';
import Wine from '../../assets/Wine.png';
import Liquor from '../../assets/Liquor.png';
import Base_Liquor from '../../assets/Base_liquor.png'
import React, { useState } from "react";
import LowAlcoRatingPopUp from '../../Pages/AlcoRatingPopUp/LowAlcoRatingPopUp/LowAlcoRatingPopUp'; // Імпорт модального вікна

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    const [showModal, setShowModal] = useState(false);

    // Функція для відкриття модального вікна
    const handleButtonClick = () => {
        setShowModal(true);
    };

    // Функція для закриття модального вікна
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const alcoButtons = [
        { text: 'Low Alcohol', icon: Beer, color: '#D9D9D9', onClick: handleButtonClick },
        { text: 'Wine', icon: Wine, color: '#D9D9D9', onClick: handleButtonClick },
        { text: 'Liquor', icon: Liquor, color: '#D9D9D9', onClick: handleButtonClick },
        { text: 'Base Liquor', icon: Base_Liquor, color: '#D9D9D9', onClick: handleButtonClick }
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

            {/* Використання компонента модального вікна */}
            <LowAlcoRatingPopUp show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default ProfilePage;
