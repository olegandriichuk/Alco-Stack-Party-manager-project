import React from 'react';
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
//import { ReactComponent as Liquor } from '/src/assets/Liquor.svg';

const HomePage: React.FC = () => {
    const isMobile = window.innerWidth <= 768;



    const parties = [
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const }
    ];

    const menuButtons = [
        { text: 'your profile', icon: faUser, color: '#1dd958', link: '/profile' },
        { text: 'join party', icon: faCake, color: '#5b7ff0', link: '/join' },
        { text: 'create party', icon: faUsers, color: '#ce5659', link: '/create' }
    ];

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
             {/* Use the corrected prop name */}
            <MenuButtonList menuButtons={menuButtons}/>

            <PartyButtonList parties={parties}/>
        </div>
    );
};

export default HomePage;
