import React, { useState } from "react";
import './LiquorRatingPopUp.css';
import SliderList from "../../../components/SliderList/SliderList";
import apricot_brandy from "../../../assets/Apricot brandy.jpg";
import triple_sec from "../../../assets/triple-sec.jpg";
import amaretto from "../../../assets/Amaretto.jpg";
import coffee_liquor from "../../../assets/Coffee liqueur.jpg";
import kahlua from "../../../assets/Kahlua.jpg";
import { UpdateAlcoholRatingsAPI } from "../../../Services/AlcoholService.tsx";
import {useAuth} from "../../../Context/useAuth.tsx"; // Імпортуємо сервіс для збереження

interface LiquorRatingPopUpProps {
    show: boolean;
    handleClose: () => void;

}

const LiquorRatingPopUp: React.FC<LiquorRatingPopUpProps> = ({ show, handleClose}) => {
    const { user, token } = useAuth();
    const [sliders, setSliders] = useState([
        { id: "ba8e7109-b4f8-47fe-961e-5edbd2806c53", label: 'Apricot brandy', value: 0, imageSrc: apricot_brandy, toggle: false },
        { id: "fc3ae631-8ef2-4eee-a683-673c78ec3fed", label: 'Triple sec', value: 0, imageSrc: triple_sec, toggle: false },
        { id: "e2541991-14ba-49bc-8572-95bdbd3f72e7", label: 'Amaretto', value: 0, imageSrc: amaretto, toggle: false },
        { id: "453479c2-f227-4d2c-82b0-9d9b4f1b09c3", label: 'Coffee liqueur', value: 0, imageSrc: coffee_liquor, toggle: false },
        { id: "b65b2a98-a10e-4f46-bd07-f321524b4973", label: 'Kahlua', value: 0, imageSrc: kahlua, toggle: false },
    ]);
    const [isSaving, setIsSaving] = useState(false); // Додано стан для індикації збереження

    // Обробник зміни значення слайдера
    const handleSliderChange = (index: number, value: number) => {
        const newSliders = [...sliders];
        newSliders[index] = { ...newSliders[index], value };
        setSliders(newSliders);
    };

    // Функція для збереження значень слайдерів
    const saveRatings = async () => {
        if (!user || !token) {
            console.log("userName:", user);
            console.log("authToken:", token);
            console.error("userName або authToken не визначені");
            return;
        }

        setIsSaving(true); // Починаємо процес збереження
        const type = 0; // Приклад типу алкоголю
        const ratings = sliders.map(slider => ({
            AlcoholId: slider.id,
            rating: slider.value
        }));

        try {
            const result = await UpdateAlcoholRatingsAPI(user.userName, type, ratings, token);
            console.log("Updated ratings:", result);
            handleClose(); // Закрити вікно після успішного збереження
        } catch (error) {
            console.error("Failed to update ratings", error);
        } finally {
            setIsSaving(false); // Завершуємо процес збереження
        }
    };

    if (!show) return null; // Якщо вікно не повинно показуватися, повертаємо null

    const sliderItems = sliders.map((slider, index) => ({
        ...slider,
        onChange: (value: number) => handleSliderChange(index, value)
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
                    <button
                        className="liquor-btn-save"
                        onClick={saveRatings}
                        disabled={isSaving} // Деактивуємо кнопку під час збереження
                    >
                        {isSaving ? "Saving..." : "Save"} {/* Індикація процесу збереження */}
                    </button>
                </div>
            </div>
        </>
    );
}

export default LiquorRatingPopUp;
