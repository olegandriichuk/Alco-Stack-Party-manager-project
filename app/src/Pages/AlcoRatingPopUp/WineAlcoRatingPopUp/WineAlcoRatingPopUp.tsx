import React, { useState } from "react";
import './WineAlcoRatingPopUp.css';
import SliderList from "../../../components/SliderList/SliderList";

interface LowAlcoRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const LowAlcoRatingPopUp: React.FC<LowAlcoRatingPopUpProps> = ({ show, handleClose }) => {
    const [sliders, setSliders] = useState([
        { label: 'White wine', value: 5 },
        { label: 'Red wine', value: 5 },
        { label: 'Rose wine', value: 5 },
        { label: 'Dessert wine', value: 5 }
    ]);

    // Обробник зміни значення слайдера
    const handleSliderChange = (index: number, value: number) => {
        const newSliders = [...sliders];
        newSliders[index] = { ...newSliders[index], value };
        setSliders(newSliders);
    };

    if (!show) return null; // Якщо вікно не повинно показуватися, повертаємо null

    const sliderItems = sliders.map((slider, index) => ({
        ...slider,
        onChange: (value: number) => handleSliderChange(index, value)
    }));

    // Обробник для кліку по фону
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose(); // Закрити вікно, якщо натиснуто на фон
        }
    };

    return (
        <>
            <div className="modal-backdrop-blur" onClick={handleBackdropClick}> {/* Фон, що закриває вікно */}
                <div className="modal-container">
                    <div className="modal-content">
                        <SliderList sliders={sliderItems} />

                        {/* Кнопка Save з великими розмірами, сірого кольору, заокруглена */}
                        <button className="btn-save" onClick={handleClose}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LowAlcoRatingPopUp;
