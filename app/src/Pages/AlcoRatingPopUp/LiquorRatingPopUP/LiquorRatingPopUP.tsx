import React, { useState } from "react";
import './LiquorRatingPopUp.css';
//import Slider from "../../../components/Slider/Slider.tsx";
import SliderList from "../../../components/SliderList/SliderList";

interface LowAlcoRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const LowAlcoRatingPopUp: React.FC<LowAlcoRatingPopUpProps> = ({ show, handleClose }) => {
    const [sliders, setSliders] = useState([
        { label: 'Amaro', value: 50, toggle: false },
        { label: 'Baileys', value: 50, toggle: false },
        { label: 'Umeru', value: 50, toggle: false },
        { label: 'Campari', value: 50, toggle: false }
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
                <div className="modal-content">
                    <SliderList sliders={sliderItems} />
                    <button className="btn btn-primary" onClick={handleClose}>Close</button>
                </div>
            </div>
        </>
    );
}

export default LowAlcoRatingPopUp;
