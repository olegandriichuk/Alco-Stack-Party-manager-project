import React, { useState } from "react";
import './StrongAlcoRatingPopUp.css';
//import Slider from "../../../components/Slider/Slider.tsx";
import SliderList from "../../../components/SliderList/SliderList";
import light_rum from "../../../assets/Light rum.jpg";
import bourbon from "../../../assets/Bourbon.jpg";
import vodka from "../../../assets/Vodka.jpg";
import gin from "../../../assets/Gin.jpg";
import blended_whiskey from "../../../assets/Blended whiskey.jpg";
import tequila from "../../../assets/Tequila.jpg";
import southern_comfort from "../../../assets/Southern Comfort.jpg";
import brandy from "../../../assets/Brandy.jpg";
import lemon_vodka from "../../../assets/Lemon vodka.jpg";
import dark_rum from "../../../assets/Dark rum.jpg";
import applejack from "../../../assets/Applejack.jpg";
import scotch from "../../../assets/Scotch.jpg";
import anejo_rum from "../../../assets/Añejo rum.jpg";
import irish_whiskey from "../../../assets/Irish whiskey.jpg";
import apple_brandy from "../../../assets/Apple brandy.jpg";
import cognac from "../../../assets/Cognac.jpg";

interface HighAlcoRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const HighAlcoRatingPopUp: React.FC<HighAlcoRatingPopUpProps> = ({ show, handleClose }) => {
    const [sliders, setSliders] = useState([
        { label: 'Light rum', value: 5, imageSrc: light_rum, toggle: false },
        { label: 'Bourbon', value: 5, imageSrc: bourbon, toggle: false },
        { label: 'Vodka', value: 5, imageSrc: vodka, toggle: false },
        { label: 'Gin', value: 5, imageSrc: gin, toggle: false },
        { label: 'Blended whiskey', value: 5, imageSrc: blended_whiskey, toggle: false },
        { label: 'Tequila', value: 5, imageSrc: tequila, toggle: false },
        { label: 'Southern Comfort', value: 5, imageSrc: southern_comfort, toggle: false },
        { label: 'Brandy', value: 5, imageSrc: brandy, toggle: false },
        { label: 'Lemon vodka', value: 5, imageSrc: lemon_vodka, toggle: false },
        { label: 'Dark rum', value: 5, imageSrc: dark_rum, toggle: false },
        { label: 'Applejack', value: 5, imageSrc: applejack, toggle: false },
        { label: 'Scotch', value: 5, imageSrc: scotch, toggle: false },
        { label: 'Añejo rum', value: 5, imageSrc: anejo_rum, toggle: false },
        { label: 'Irish whiskey', value: 5, imageSrc: irish_whiskey, toggle: false },
        { label: 'Apple brandy', value: 5, imageSrc: apple_brandy, toggle: false },
        { label: 'Cognac', value: 5, imageSrc: cognac, toggle: false },
    ]);

    // Обробник зміни значення слайдера
    const handleSliderChange = (index: number, value: number) => {
        const newSliders = [...sliders];
        newSliders[index] = { ...newSliders[index], value };
        setSliders(newSliders);
    };

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

    if (!show) return null; // Якщо вікно не повинно показуватися, повертаємо null

    return (
        <>
            <div className="strongalco-modal-backdrop-blur" onClick={handleBackdropClick}/> {/* Заблюрений фон */}
            <div className="strongalco-modal-container">
                <div className="strongalco-modal-content">
                    <div className="strongalco-slider-list-container">
                        <SliderList sliders={sliderItems}/>
                    </div>
                    <button className="strongalco-btn-save" onClick={handleClose}>Save</button>
                </div>
            </div>
        </>
    );
}

export default HighAlcoRatingPopUp;
