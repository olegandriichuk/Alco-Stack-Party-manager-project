import React from 'react';
import './MenuButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // Import the CSS file for styling
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';



interface MenuButtonProps {
    text: string;
    icon: IconDefinition;
    color: string;
    // onClick?: () => void;
}

// const MenuButton: React.FC<MenuButtonProps> = ({ text, icon, color = 'primary', onClick }) => {
const MenuButton: React.FC<MenuButtonProps> = ({ text, icon, color = 'primary'}) => {
    const menuButtonStyle: React.CSSProperties = {
        backgroundColor: color,
    };

    return (
        // <button className={`btn btn-${color} menu-button`} onClick={onClick} style={menuButtonStyle}>
        <button className={`btn btn-${color} menu-button`} style={menuButtonStyle}>
            <FontAwesomeIcon icon={icon} size="2x"/>
            <span>{text}</span>
        </button>
    );
};

export default MenuButton;
