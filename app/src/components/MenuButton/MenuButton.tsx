import React from 'react';
import './MenuButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // Import the CSS file for styling
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {Link} from "react-router-dom";



interface MenuButtonProps {
    text: string;
    icon: IconDefinition;
    color: string;
    link: string;
    // onClick?: () => void;
    className?: string; // Add this prop to pass the class
}

// const MenuButton: React.FC<ChooseAlcoButtonProps> = ({ text, icon, color = 'primary', onClick }) => {
const MenuButton: React.FC<MenuButtonProps> = ({ text, icon, color = 'primary', link, className}) => {
    const MenuButtonStyle: React.CSSProperties = {
        backgroundColor: color,
    };

    const LinkStyle: React.CSSProperties = {
        textDecoration: 'none',
        color: 'black',
    }

    return (
        // <button className={`btn btn-${color} menu-button`} onClick={onClick} style={menuButtonStyle}>
        <Link to={link} style={LinkStyle}>
            <button className={`btn btn-${color} menu-button`} style={MenuButtonStyle}>
                <FontAwesomeIcon icon={icon} size="2x"/>
                <span className={`menu-button-text ${className}`}>{text}</span>
            </button>
        </Link>
    );
};

export default MenuButton;
