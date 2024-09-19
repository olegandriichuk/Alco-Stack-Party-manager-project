import React, { useState } from "react";
import './StrongAlcoRatingPopUp.css';
//import Slider from "../../../components/Slider/Slider.tsx";
import SliderList from "../../../components/SliderList/SliderList";

interface LowAlcoRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const LowAlcoRatingPopUp: React.FC<LowAlcoRatingPopUpProps> = ({ show, handleClose }) => {
    const [sliders, setSliders] = useState([
        { label: 'Vodka', value: 5, toggle: false },
        { label: 'Whiskey', value: 5, toggle: false },
        { label: 'Gin', value: 5, toggle: false },
        { label: 'Tequila', value: 5, toggle: false },
        { label: 'Rum', value: 5, toggle: false }
    ]);

    // Обробник зміни значення слайдера
    const handleSliderChange = (index: number, value: number) => {
        const newSliders = [...sliders];
        newSliders[index] = { ...newSliders[index], value };
        setSliders(newSliders);
    };

    // Обробник зміни стану перемикача
    // const handleToggleChange = (index: number) => {
    //     const newSliders = [...sliders];
    //     newSliders[index] = { ...newSliders[index], toggle: !newSliders[index].toggle };
    //     setSliders(newSliders);
    // };

    if (!show) return null; // Якщо вікно не повинно показуватися, повертаємо null

    const sliderItems = sliders.map((slider, index) => ({
        ...slider,
        onChange: (value: number) => handleSliderChange(index, value)
        //onToggleChange: () => handleToggleChange(index)
    }));
// Обробник для кліку по фону
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose(); // Закрити вікно, якщо натиснуто на фон
        }
    };
    return (
        <>
            <div className="strongalco-modal-backdrop-blur" onClick={handleBackdropClick}/> {/* Заблюрений фон */}
            <div className="strongalco-modal-container">
                <div className="strongalco-modal-content">
                    <SliderList sliders={sliderItems}/>
                    <button className="strongalco-btn-save" onClick={handleClose}>Save</button>
                </div>
            </div>
        </>
    );
}

export default LowAlcoRatingPopUp;
