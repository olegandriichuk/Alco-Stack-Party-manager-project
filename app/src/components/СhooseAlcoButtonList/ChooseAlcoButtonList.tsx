import React from 'react';
import './ChooseAlcoButtonList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChooseAlcoButton from '../ChooseAlcoButton/ChooseAlcoButton';

interface ChooseAlcoButtonProps {
    text: string;
    icon: string;  // Шлях до зображення
    color: string;
    onClick: () => void;
}

interface ChooseAlcoButtonListProps {
    alcoButtons: ChooseAlcoButtonProps[];
}

const ChooseAlcoButtonList: React.FC<ChooseAlcoButtonListProps> = ({ alcoButtons }) => {
    return (
        <div className="alco-container d-flex flex-column align-items-center">  {/* Використовуємо flexbox для центрування */}
            <div className="row justify-content-center">
                {alcoButtons.map((button, index) => (
                    <div key={index} className="col-12 col-md-12 mb-4 d-flex justify-content-center">
                        <ChooseAlcoButton
                            text={button.text}
                            icon={button.icon}
                            color={button.color}
                            onClick={button.onClick}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseAlcoButtonList;
