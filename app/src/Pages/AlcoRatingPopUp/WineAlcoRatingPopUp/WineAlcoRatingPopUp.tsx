import React, { useState } from "react";
import './WineAlcoRatingPopUp.css';
import SliderList from "../../../components/SliderList/SliderList";
import martini from "../../../assets/martini.jpg";
import sweet_vermouth from "../../../assets/sweet_vermouth.jpg";
import champagne from "../../../assets/champagne.jpg";
import dubonnet from "../../../assets/dubonnet.jpg";
import prosecco from "../../../assets/dubonnet.jpg";
interface WineRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const WineRatingPopUp: React.FC<WineRatingPopUpProps> = ({ show, handleClose }) => {
    const [sliders, setSliders] = useState([
        { label: 'Sweet Vermouth', imageSrc: sweet_vermouth, value: 5 },
        { label: 'Dry Vermouth',imageSrc: martini,value: 5 },
        { label: 'Champagne',imageSrc: champagne,  value: 5 },
        { label: 'Dubonnet Rouge', imageSrc: dubonnet, value: 5 },
        { label: 'Prosecco', imageSrc: prosecco, value: 5 }
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
            <div className="midalco-modal-backdrop-blur" onClick={handleBackdropClick}> {/* Фон, що закриває вікно */}
                <div className="midalco-modal-container">
                    <div className="midalco-modal-content">
                        <SliderList sliders={sliderItems} />

                        {/* Кнопка Save з великими розмірами, сірого кольору, заокруглена */}
                        <button className="midalco-btn-save" onClick={handleClose}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WineRatingPopUp;
