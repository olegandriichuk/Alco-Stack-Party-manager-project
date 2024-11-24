import React from 'react';
import './ChooseAlcoButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import HalantB from '../../assets/fonts/halant/Halant-Bold.ttf';
import alcoback from "../../assets/alcobuttonpopupBack.svg"
interface AlcoButtonProps {
    text: string;
    icon: string;
    color: string;
    onClick: () => void; // onClick пропс для обробки натискання
    className?: string;
}

const AlcoButton: React.FC<AlcoButtonProps> = ({ text, icon, color = 'primary', onClick, className }) => {
    const AlcoButtonStyle: React.CSSProperties = {
        backgroundImage: `url(${alcoback})`,
        color: color,
        border: '3px solid #50C5FF',
        borderRadius: '16px', // Заокруглення кутів
    };

    return (
        <button
            className={`btn choose-alco-button`}
            style={AlcoButtonStyle}
            onClick={onClick} // Виконати функцію при натисканні
        >
            <img src={icon} alt="" style={{width: '40px', height: '40px'}}/><br></br> {/* Іконка кнопки */}
            <span className={`choose-alco-button-text ${className}`}>

                {text}
            </span>
        </button>
    );
};

export default AlcoButton;
