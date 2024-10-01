import React from 'react';
import './ChooseAlcoButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import HalantB from '../../assets/fonts/halant/Halant-Bold.ttf';

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
            <span className={`choose-alco-button-text ${className}`}>
                {/*<style>*/}
                {/*    {`*/}
                {/*        @font-face {*/}
                {/*            font-family: 'HalantB';*/}
                {/*            src: url(${HalantB}) format('truetype');*/}
                {/*        }*/}

                {/*        .choose-alco-button-text {*/}
                {/*            font-family: 'HalantB', serif;*/}
                {/*            color: #484545*/}
                {/*        }*/}
                {/*    `}*/}
                {/*</style>*/}
                {text}
            </span>
            <img src={icon} alt="" style={{width: '29px', height: '29px'}}/> {/* Іконка кнопки */}
        </button>
    );
};

export default AlcoButton;
