import MenuButtonList from '../../components/MenuButtonList/MenuButtonList';
import { faUser, faUsers, faCake, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.svg';
import Disco from '../../assets/disco.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from 'react';
import PartyButtonList from '../../components/PartyButtonList/PartyButtonList';
import {Link} from "react-router-dom";

const HomePage: React.FC = () => {
    const parties = [
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
        { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const }
    ];

    const menuButtons = [
        { text: 'Profile', icon: faUser, color: '#1dd958', link: '/profile' },
        { text: 'Join', icon: faCake, color: '#5b7ff0', link: '/join' },
        { text: 'Create', icon: faUsers, color: '#ce5659', link: '/create' }
    ];

    return (
        <div className="container-fluid p-0 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                    <img
                        src={Disco} // Adjust the path to your party icon
                        alt="Party Icon"
                        width="80"
                        height="80"
                    />
                </div>
                <Link to={"/welcome"} className="p-2" aria-label="Go to Welcome Page">
                    <FontAwesomeIcon icon={faCircleInfo} size="2x" color="black" />
                </Link>
            </div>
            <img
                src={Logo}
                alt="Logo"
                width="200"
                height="80"
                style={{margin: '1rem'}}
            />
            <h1>Your party, your rules!</h1>
            <h4>Your unforgettable night!</h4>
            <MenuButtonList menuButtons={menuButtons}/>
            <PartyButtonList parties={parties}/>
        </div>
    );
};

export default HomePage;

