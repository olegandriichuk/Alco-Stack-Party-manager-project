﻿import React, { useEffect, useState } from 'react';
import MenuButtonList from '../../components/MenuButtonList/MenuButtonList';
import PartyButtonList from '../../components/PartyButtonList/PartyButtonList';
import { faUser, faUsers, faCake, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.svg';
import Disco from '../../assets/disco.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import JejuHallasan from '../../assets/fonts/JejuHallasan-Regular.ttf';
import Halant from '../../assets/fonts/halant/Halant-SemiBold.ttf';
import backgroundImage from '../../assets/backleft.svg';
import backgroundImage1 from '../../assets/backright.svg';
import backgroundImageMobile from '../../assets/backPhone.svg';
import CreatePartyPopUp from '../../components/CreatePartyPopUp/CreatePartyPopUp';
import JoinPartyPopUp from "../../components/JoinPartyPopUp/JoinPartyPopUp";
import { useAuth } from "../../Context/useAuth.tsx";
import { toast } from "react-toastify";
import { GetPartyListAPI } from "../../Services/PartyService";
import { PartyListGet } from "../../Models/Party.tsx";
// import Employee from '../../components/Random/Random'; // Import the Employee component

const HomePage: React.FC = () => {
    const isMobile = window.innerWidth <= 768;

    const { token } = useAuth();
    const [parties, setParties] = useState<PartyListGet[]>([]);

    const UserPartiesGet = async () => {
        if (!token) {
            toast.error("You must be logged in to view your parties");
            return;
        }
        try {
            const response = await GetPartyListAPI(token);
            if (response && response.data) {
                setParties(response.data); // Update state with the party data
            } else {
                setParties([]); // If response is undefined or empty, set an empty array
            }
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

    const menuButtons = [
        { text: 'your profile', icon: faUser, color: '#1dd958', link: '/profile' },
        { text: 'join party', icon: faCake, color: '#5b7ff0', onClick: handleShowJoinParty },
        { text: 'create party', icon: faUsers, color: '#ce5659', onClick: handleShowCreateParty },
    ];

    // Static employee data
    // const staticEmployees = [
    //     {
    //         employeeID: 1,
    //         employeeName: 'John Doe',
    //         occupation: 'Software Engineer',
    //         imageName: 'john.png',
    //         imageSrc: '/img/john.png',
    //         imageFile: null
    //     },
    //     {
    //         employeeID: 2,
    //         employeeName: 'Jane Smith',
    //         occupation: 'Project Manager',
    //         imageName: 'jane.png',
    //         imageSrc: '/img/jane.png',
    //         imageFile: null
    //     },
    //     {
    //         employeeID: 3,
    //         employeeName: 'Mike Johnson',
    //         occupation: 'Designer',
    //         imageName: 'mike.png',
    //         imageSrc: '/img/mike.png',
    //         imageFile: null
    //     }
    // ];

    return (
        <div
            className="container-fluid p-0 d-flex flex-column align-items-center custom-background"
            style={{
                backgroundColor: '#DDE4EE',
                backgroundImage: isMobile ? `url(${backgroundImageMobile})` : `url(${backgroundImage}), url(${backgroundImage1})`,
                backgroundSize: isMobile ? 'auto' : 'auto, auto',
                backgroundPosition: isMobile ? 'center' : '-1.5% 2%, 101.5% 2%',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
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
                `}
            </style>
            <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                    <img
                        src={Disco}
                        alt="Party Icon"
                        width="80"
                        height="80"
                    />
                </div>
                <Link to={"/welcome"} className="p-2" aria-label="Go to Welcome Page">
                    <FontAwesomeIcon icon={faCircleInfo} size="2x" color="black" />
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
                    <br />
                    STACK
                </span>
            </div>

            <h2 className="custom-heading">Your party, your rules!</h2>
            <h2 className="custom-heading">Your unforgettable night!🎉</h2>
            <MenuButtonList menuButtons={menuButtons}/>
            <PartyButtonList parties={parties}/>

            {/*/!* Render static employees *!/*/}
            {/*<div className="employee-list">*/}
            {/*    {staticEmployees.map((employee) => (*/}
            {/*        <Employee*/}
            {/*            key={employee.employeeID}*/}
            {/*            addOrEdit={() => {}}*/}
            {/*            recordForEdit={employee}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}

            {showCreatePartyPopUp && (
                <CreatePartyPopUp show={showCreatePartyPopUp} handleClose={handleCloseCreateParty} />
            )}

            {showJoinPartyPopUp && (
                <JoinPartyPopUp show={showJoinPartyPopUp} handleClose={handleCloseJoinParty} />
            )}

        </div>
    );
};

export default HomePage;
