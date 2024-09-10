import React, { useState } from "react";
import './WineAlcoRatingPopUp.css';
import SliderList from "../../../components/SliderList/SliderList";

interface LowAlcoRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const LowAlcoRatingPopUp: React.FC<LowAlcoRatingPopUpProps> = ({ show, handleClose }) => {
    const [sliders, setSliders] = useState([
        { label: 'White wine', value: 50, toggle: false },
        { label: 'Red wine', value: 50, toggle: false },
        { label: 'Rose wine', value: 50, toggle: false },
        { label: 'Dessert wine', value: 50, toggle: false }
    ]);

    // Обробник зміни значення слайдера
    const handleSliderChange = (index: number, value: number) => {
        const newSliders = [...sliders];
        newSliders[index] = { ...newSliders[index], value };
        setSliders(newSliders);
    };

    // Обробник зміни стану перемикача
    const handleToggleChange = (index: number) => {
        const newSliders = [...sliders];
        newSliders[index] = { ...newSliders[index], toggle: !newSliders[index].toggle };
        setSliders(newSliders);
    };

    if (!show) return null; // Якщо вікно не повинно показуватися, повертаємо null

    const sliderItems = sliders.map((slider, index) => ({
        ...slider,
        onChange: (value: number) => handleSliderChange(index, value),
        onToggleChange: () => handleToggleChange(index)
    }));

    return (
        <>
            <div className="modal-backdrop-blur" /> {/* Заблюрений фон */}
            <div className="modal-container">
                {/* Кнопка Back у верхньому правому куті */}
                <button className="btn-back" onClick={handleClose}>Back</button>

                <div className="modal-content">
                    <SliderList sliders={sliderItems} />

                    {/* Кнопка Save з великими розмірами, сірого кольору, заокруглена */}
                    <button className="btn-save" onClick={handleClose}>Save</button>
                </div>
            </div>
        </>
    );
}

export default LowAlcoRatingPopUp;
