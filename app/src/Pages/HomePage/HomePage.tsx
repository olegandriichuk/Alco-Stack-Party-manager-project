import React, { useEffect, useState } from 'react';
import MenuButtonList from '../../components/MenuButtonList/MenuButtonList';
import PartyButtonList from '../../components/PartyButtonList/PartyButtonList';
import { faUser, faUsers, faCake, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.svg';
import Disco from '../../assets/disco.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import JejuHallasan from '../../assets/fonts/JejuHallasan-Regular.ttf';
import Halant from '../../assets/fonts/halant/Halant-SemiBold.ttf';
import backgroundImage from '../../assets/backcov1.svg';
import video from '../../assets/viddd2.mp4';
import CreatePartyPopUp from '../../components/CreatePartyPopUp/CreatePartyPopUp';
import JoinPartyPopUp from "../../components/JoinPartyPopUp/JoinPartyPopUp";
import { useAuth } from "../../Context/useAuth.tsx";
import { toast } from "react-toastify";
import { GetPartyListAPI } from "../../Services/PartyService";
import { PartyListGet } from "../../Models/Party.tsx";
import './HomePage.css';


const HomePage: React.FC = () => {
    const isMobile = window.innerWidth <= 768;

    const { token } = useAuth();
    const [parties, setParties] = useState<PartyListGet[]>([]);
    //const [zoomLevel, setZoomLevel] = useState(1);

    const UserPartiesGet = async () => {
        if (!token) {
            toast.error("You must be logged in to view your parties");
            return;
        }
        try {
            const response = await GetPartyListAPI(token);
            console.log(response);
            if (response && response.data) {
                setParties(response.data); // Update state with the party data
            } else {
                setParties([]); // If response is undefined or empty, set an empty array
            }
            console.log(parties);
        } catch (error) {
            console.error('Failed to fetch parties', error);
            toast.error('Failed to fetch parties. Please try again.');
            setParties([]); // Set an empty array in case of error
        }
    };

    useEffect(() => {
        UserPartiesGet();
    }, []);

    const [showCreatePartyPopUp, setShowCreatePartyPopUp] = useState(false);
    const [showJoinPartyPopUp, setShowJoinPartyPopUp] = useState(false);

    const handleShowCreateParty = () => setShowCreatePartyPopUp(true);
    const handleShowJoinParty = () => setShowJoinPartyPopUp(true);

    const handleCloseCreateParty = () => {
        setShowCreatePartyPopUp(false);
        UserPartiesGet(); // Refresh the party list after closing the pop-up
    };
    const handleCloseJoinParty = () => {
        setShowJoinPartyPopUp(false);
        UserPartiesGet(); // Refresh the party list after closing the pop-up
    };

    // // Функция для получения текущего уровня масштабирования
    // const getZoomLevel = () => {
    //     return window.outerWidth / window.innerWidth;
    // };
    //
    // // Обработчик изменения размера окна (для отслеживания масштабирования)
    // const handleResize = () => {
    //     const newZoomLevel = getZoomLevel();
    //     setZoomLevel(newZoomLevel); // Обновляем состояние с новым уровнем масштабирования
    // };
    //
    // // useEffect для отслеживания изменения размера окна
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);
    //
    //     // Убираем обработчик при размонтировании компонента
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    const menuButtons = [
        { text: 'your profile', icon: faUser, color: 'rgba(225, 219, 101, 0.9)', link: '/profile' },
        { text: 'join party', icon: faCake, color: 'rgba(112, 140, 231, 0.9)', onClick: handleShowJoinParty },
        { text: 'create party', icon: faUsers, color: 'rgba(224, 122, 122, 0.9)', onClick: handleShowCreateParty },
    ];

    const videoStyles : React.CSSProperties = {
        position: isMobile ? 'static' : 'fixed',
        top: 0,
        // width: isMobile ? '100%' : `${28 / zoomLevel}%`,
        height: isMobile ? '0vh' : '100vh',
        objectFit: 'cover' as const,
        zIndex: -1,
       boxSizing: 'border-box',

    };

    return (
        <div className="container-fluid d-flex p-0" style={{minHeight: '100vh'}}>

            <div className="video-left flex-grow-1">
                <video className="background-video left" style={{...videoStyles, width: isMobile ? '100%' : '45vw',}} autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

            <div
                className="container-fluid p-0 d-flex flex-column align-items-center custom-background square-container flex-grow-7"
                style={{
                    backgroundColor: '#DDE4EE',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: isMobile ? '-3px 10px' : '31px 6px',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    minHeight: isMobile ? '100vh' : '100vh',
                }}>
                <style>
                    {`
                @font-face {
                    font-family: 'JejuHallasan';
                    src: url(${JejuHallasan}) format('truetype');
                }
        
                @font-face {
                    font-family: 'Halant';
                    src: url(${Halant}) format('truetype');
                }
    
                .logo-text {
                    font-family: 'JejuHallasan', sans-serif;
                }
                
                .custom-heading {
                    font-family: 'Halant', serif;
                }
                
               .square-container {
                        position: relative;
                        width: 100%;
                        height: auto;
                        max-width: 800px;
                        max-height: 900px;
                        margin: 0 auto;
                        background-color: white;
                        border-radius: 10px;
                        box-shadow: 0 8px 30px rgba(255, 255, 255, 1), /* Основная большая тень */
                                    0 5px 15px rgba(255, 255, 255, 1); /* Дополнительная мягкая тень */
                        z-index: 1;
                    }
            
            // /* Эффект при наведении: увеличиваем элемент только на десктопе */
            // .square-container:hover {
            //     transform: perspective(1000px) scale(1.05);
            // }
            //
            // /* Отключаем увеличение для мобильных устройств с помощью медиа-запросов */
            // @media (max-width: 768px) {
            //     .square-container {
            //         transform: none; /* Отключаем любые трансформации */
            //     }
            //
            //     // .square-container:hover {
            //     //     transform: none; /* Убираем увеличение при наведении */
            //     // }
            // }

                
        `}
                </style>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="disco-container" style={{marginTop: '-1.5px'}}>
                        <img
                            src={Disco}
                            alt="Party Icon"
                            width="80"
                            height="80"
                        />
                    </div>
                    <Link to={"/welcome"} className="p-2" aria-label="Go to Welcome Page">
                        <FontAwesomeIcon icon={faCircleInfo} size="2x" color="black"/>
                    </Link>
                </div>

                <div className="logo-container d-flex align-items-center">
                    <img
                        src={Logo}
                        alt="Logo"
                        width="200"
                        height="90"
                    />
                    <span className="logo-text" style={{
                        position: 'relative',
                        top: '-5px',
                        left: '-102px',
                        fontSize: '13px',
                        fontFamily: 'JejuHallasan, sans-serif',
                        lineHeight: '1'
                    }}>
                    <span style={{
                        display: 'inline-block',
                        transform: 'translateX(4px)'
                    }}>
                        ALCO
                    </span>
                    <br/>
                    STACK
                </span>
                </div>

                <div className="centered-container">
                    <h2 className="custom-heading">Your party, your rules!</h2>
                    <h2 className="custom-heading">Your unforgettable night!🎉</h2>
                </div>

                <style>
                    {`
                    .custom-heading {
                        text-align: center;
                        font-family: 'Halant', serif;
                        width: 100%;
                    }
            
                    .centered-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                    }
                `}
                </style>


                {showCreatePartyPopUp && (
                    <CreatePartyPopUp show={showCreatePartyPopUp} handleClose={handleCloseCreateParty}/>
                )}

                <MenuButtonList menuButtons={menuButtons}/>
                {/*<div className="slider-list-container">*/}
                    <PartyButtonList parties={parties}/>
               {/*// </div>*/}
                {showJoinPartyPopUp && (
                    <JoinPartyPopUp show={showJoinPartyPopUp} handleClose={handleCloseJoinParty}/>
                )}

            </div>
            <div className="video-right flex-grow-1">
                <video className="background-video right" style={{...videoStyles, right: 0, width: isMobile ? '100%' : '45vw',}} autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

        </div>
    );
};

export default HomePage;