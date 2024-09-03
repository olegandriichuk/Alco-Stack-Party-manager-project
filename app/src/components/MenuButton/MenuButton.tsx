import React from 'react';
import './MenuButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Link } from "react-router-dom";

interface MenuButtonProps {
    text: string;
    icon: IconDefinition;
    color: string;
    link?: string; // Optional link prop
    onClick?: () => void; // Optional onClick prop
    className?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ text, icon, color = 'primary', link, onClick, className }) => {
    const menuButtonStyle: React.CSSProperties = {
        backgroundColor: color,
    };

    return link ? (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <button className={`btn btn-${color} menu-button`} style={menuButtonStyle}>
                <FontAwesomeIcon icon={icon} size="2x" />
                <span className={`menu-button-text ${className}`}>{text}</span>
            </button>
        </Link>
    ) : (
        <button className={`btn btn-${color} menu-button`} style={menuButtonStyle} onClick={onClick}>
            <FontAwesomeIcon icon={icon} size="2x" />
            <span className={`menu-button-text ${className}`}>{text}</span>
        </button>
    );
};

export default MenuButton;
