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
import LowAlcoRatingPopUp from '../../Pages/AlcoRatingPopUp/LowAlcoRatingPopUp/LowAlcoRatingPopUp';// Імпорт модального вікна
import WineAlcoRatingPopUp from '../AlcoRatingPopUp/WineAlcoRatingPopUp/WineAlcoRatingPopUp';
import LiquorRatingPopUP from '../AlcoRatingPopUp/LiquorRatingPopUP/LiquorRatingPopUP';
import StrongAlcoRatingPopUp from '../AlcoRatingPopUp/StrongAlcoRatingPopUp/StrongAlcoRatingPopUp';
const ProfilePage: React.FC = () => {
    const { user } = useAuth();

  //  const [showModal, setShowModal] = useState(false);
    const [showLowAlcoModal, setShowLowAlcoModal] = useState(false);
    const [showWineModal, setShowWineModal] = useState(false);
    const [showLiquorModal, setShowLiquorModal] = useState(false);
    const [showStrongAlcoModal, setShowStrongAlcoModal] = useState(false);
    const handleLowAlcoButtonClick = () => {
        setShowLowAlcoModal(true);
    };

    // Функція для відкриття вікна Wine
    const handleWineButtonClick = () => {
        setShowWineModal(true);
    };

    const handleLiquorButtonClick = () => {
        setShowLiquorModal(true);
    };
    const handleStrongAlcoButtonClick = () => {
        setShowStrongAlcoModal(true);
    };

    // Функція для закриття будь-якого модального вікна
    const handleCloseModal = () => {
        setShowLowAlcoModal(false);
        setShowWineModal(false);
        setShowLiquorModal(false);
        setShowStrongAlcoModal(false);
    };



    const alcoButtons = [
        { text: 'Low Alcohol', icon: Beer, color: '#D9D9D9', onClick: handleLowAlcoButtonClick },
        { text: 'Wine', icon: Wine, color: '#D9D9D9', onClick: handleWineButtonClick },
        { text: 'Liquor', icon: Liquor, color: '#D9D9D9', onClick: handleLiquorButtonClick },
        { text: 'Base Liquor', icon: Base_Liquor, color: '#D9D9D9', onClick: handleStrongAlcoButtonClick }
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
            <LowAlcoRatingPopUp show={showLowAlcoModal} handleClose={handleCloseModal} />
            <WineAlcoRatingPopUp show={showWineModal} handleClose={handleCloseModal} />
            <LiquorRatingPopUP show={showLiquorModal} handleClose={handleCloseModal} />
            <StrongAlcoRatingPopUp show={showStrongAlcoModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default ProfilePage;
