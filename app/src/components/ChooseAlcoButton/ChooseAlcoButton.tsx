import React from 'react';
import './ChooseAlcoButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

interface AlcoButtonProps {
    text: string;
    icon: string;
    color: string;
    link: string;
    className?: string;
}

const AlcoButton: React.FC<AlcoButtonProps> = ({ text, icon, color = 'primary', link, className}) => {
    const AlcoButtonStyle: React.CSSProperties = {
        backgroundColor: color,
    };

    const LinkStyle: React.CSSProperties = {
        textDecoration: 'none',
        color: 'black',
        width: '100%' /* Ширина лінку також має бути 100% */
    };

    return (
        <Link to={link} style={LinkStyle}>
            <button className={`btn choose-alco-button`} style={AlcoButtonStyle}>
                <span className={`choose-alco-button-text ${className}`}>{text}</span>
                <img src={icon} alt="" style={{ width: '29px', height: '29px' }} /> {/* Іконка кнопки */}
            </button>
        </Link>
    );
};

export default AlcoButton;
