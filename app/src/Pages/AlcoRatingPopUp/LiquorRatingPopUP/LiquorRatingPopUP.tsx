import React, { useState } from "react";
import './LiquorRatingPopUp.css';
//import Slider from "../../../components/Slider/Slider.tsx";

import SliderList from "../../../components/SliderList/SliderList";
import apricot_brandy from "../../../assets/Apricot brandy.jpg";
import triple_sec from "../../../assets/triple-sec.jpg";
import amaretto from "../../../assets/Amaretto.jpg";
import coffee_liquor from  "../../../assets/Coffee liqueur.jpg";
import kahlua from "../../../assets/Kahlua.jpg";

interface LiquorRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const LiquorRatingPopUp: React.FC<LiquorRatingPopUpProps> = ({ show, handleClose }) => {
    const [sliders, setSliders] = useState([
        { label: 'Apricot brandy', value: 5,imageSrc: apricot_brandy, toggle: false },
        { label: 'Triple sec', value: 5,imageSrc: triple_sec, toggle: false },
        { label: 'Amaretto', value: 5,imageSrc: amaretto, toggle: false },
        { label: 'Coffee liqueur', value: 5,imageSrc: coffee_liquor, toggle: false },
        { label: 'Kahlua', value: 5,imageSrc: kahlua, toggle: false },
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
       // onToggleChange: () => handleToggleChange(index)
    }));
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose(); // Закрити вікно, якщо натиснуто на фон
        }
    };

    return (
        <>
            <div className="liquor-modal-backdrop-blur" onClick={handleBackdropClick}/> {/* Заблюрений фон */}
            <div className="liquor-modal-container">
                <div className="liquor-modal-content">
                    <SliderList sliders={sliderItems}/>
                    <button className="liquor-btn-save" onClick={handleClose}>Save</button>
                </div>
            </div>
        </>
    );
}

export default LiquorRatingPopUp;
