import React from 'react';
import './ChooseAlcoButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AlcoButtonProps {
    text: string;
    icon: string;
    color: string;
    onClick: () => void; // onClick пропс для обробки натискання
    className?: string;
}

const AlcoButton: React.FC<AlcoButtonProps> = ({ text, icon, color = 'primary', onClick, className }) => {
    const AlcoButtonStyle: React.CSSProperties = {
        backgroundColor: color,
    };

    return (
        <button
            className={`btn choose-alco-button`}
            style={AlcoButtonStyle}
            onClick={onClick} // Виконати функцію при натисканні
        >
            <span className={`choose-alco-button-text ${className}`}>{text}</span>
            <img src={icon} alt="" style={{ width: '29px', height: '29px' }} /> {/* Іконка кнопки */}
        </button>
    );
};

export default AlcoButton;
