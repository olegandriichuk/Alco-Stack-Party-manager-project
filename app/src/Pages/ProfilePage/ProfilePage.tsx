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
// import backgroundImage1 from '../../assets/backcov1.svg';
//import HalantSemiBold from '../../assets/fonts/halant/Halant-SemiBold.ttf';
// import video from '../../assets/viddd2.mp4';
import './ProfilePage.css';


const ProfilePage: React.FC = () => {
    const isMobile = window.innerWidth <= 768;
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
        { text: 'Mid Alcohol', icon: Wine, color: '#D9D9D9', onClick: handleWineButtonClick },
        { text: 'Liquor', icon: Liquor, color: '#D9D9D9', onClick: handleLiquorButtonClick },
        { text: 'High Alcohol', icon: Base_Liquor, color: '#D9D9D9', onClick: handleStrongAlcoButtonClick }
    ];

    return (
        <div className="container-fluid d-flex p-0 full-height-profile">
            {/*<div className="video-left flex-grow-1">*/}
            {/*    <video className="background-video-profile left" autoPlay loop muted>*/}
            {/*        <source src={video} type="video/mp4"/>*/}
            {/*        Your browser does not support the video tag.*/}
            {/*    </video>*/}
            {/*</div>*/}

            <div
                className="container-fluid p-0 d-flex flex-column align-items-center custom-background square-container-profile flex-grow-7"
                style={{
                    backgroundColor: 'white',
                    // backgroundImage: `url(${backgroundImage1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: isMobile ? '-3px 10px' : '15px 6px',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    minHeight: isMobile ? '100vh' : '100vh',
                }}>

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
                        <FontAwesomeIcon icon={faHome} size="3x" color="black"/>
                    </Link>
                </div>

                <ProfileCard
                    UserName={user?.userName || ""}
                    name={user?.firstName || ""}
                    Surname={user?.lastName || ""}
                    Phone={user?.phoneNumber || ""}
                    Email={user?.email || ""}
                    Gender={user?.gender || 0}
                    photoSrc={user?.photoSrc || ""}
                    formBackgroundSrc={user?.formBackgroundSrc || ""}
                />
                <h3 className="profile-alco-header">
                    Your alcohol preferences🍾
                </h3>


                <ChooseAlcoButtonList alcoButtons={alcoButtons}/>

                {/* Використання компонента модального вікна */}
                <LowAlcoRatingPopUp show={showLowAlcoModal} handleClose={handleCloseModal}/>
                <WineAlcoRatingPopUp show={showWineModal} handleClose={handleCloseModal}/>
                <LiquorRatingPopUP show={showLiquorModal} handleClose={handleCloseModal}/>
                <StrongAlcoRatingPopUp show={showStrongAlcoModal} handleClose={handleCloseModal}/>
            </div>


        </div>
    );
}

export default ProfilePage;
