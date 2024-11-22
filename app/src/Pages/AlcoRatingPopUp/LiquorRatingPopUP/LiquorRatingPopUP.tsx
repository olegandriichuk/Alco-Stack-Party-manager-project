import React, { useState, useEffect } from "react";
import './LiquorRatingPopUp.css';
import SliderList from "../../../components/SliderList/SliderList";
import apricot_brandy from "../../../assets/Apricot brandy.jpg";
import triple_sec from "../../../assets/triple-sec.jpg";
import amaretto from "../../../assets/Amaretto.jpg";
import coffee_liquor from "../../../assets/Coffee liqueur.jpg";
import kahlua from "../../../assets/Kahlua.jpg";
import { UpdateAlcoholRatingsAPI, GETAlcoholRatingsAPI } from "../../../Services/AlcoholService.tsx";
import {useAuth} from "../../../Context/useAuth.tsx";
//import {SliderAlcoholPatch} from "../../../Models/Alcohol.tsx"; // Імпортуємо сервіс для збереження
import { toast } from "react-toastify";
interface LiquorRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
    // onRatingSave: () => void;
}

const LiquorRatingPopUp: React.FC<LiquorRatingPopUpProps> = ({ show, handleClose}) => {
    const { user, token } = useAuth();

    const [sliders, setSliders] = useState([
        { id: '302002bb-75cf-4f3e-bcfa-879094873128', label: 'Apricot brandy', value: 0, imageSrc: apricot_brandy, toggle: false },
        { id: '775ca315-06ed-46c3-8c25-8eb11c06eb43', label: 'Triple sec', value: 0, imageSrc: triple_sec, toggle: false },
        { id: '9bc1c58a-6065-4525-9a9b-03faeca93557', label: 'Amaretto', value: 0, imageSrc: amaretto, toggle: false },
        { id: '80575096-0f64-4ef4-8e1c-bb73eecb2cab', label: 'Coffee liqueur', value: 0, imageSrc: coffee_liquor, toggle: false },
        { id: 'c5c71908-0a99-4e14-9b46-0008919c14e5', label: 'Kahlua', value: 0, imageSrc: kahlua, toggle: false },
    ]);

    const fetchUserRatings = async () => {
        if (!token) {
            toast.error("You must be logged in to view your ratings");
            return;
        }
        try {

            const response = await GETAlcoholRatingsAPI(user?.userName, token);
            // console.log("RESPONSE:", response);
            if (response && response.data) {
                console.log("Response Data:", response.data);

                const updatedSliders = sliders.map(slider => {
                    console.log("Slider ID:", slider.id);
                    console.log("Rating ID: ", response.data.find(alcohol => alcohol.alcoholId === slider.id));
                    const ratingData = response.data.find(alcohol => alcohol.alcoholId === slider.id);
                    if (ratingData) {
                        console.log("Found Rating Data:", ratingData);
                    } else {
                        console.log("No match found for Slider ID:", slider.id);
                    }
                    return ratingData ? { ...slider, value: ratingData.rating } : slider;
                });

                setSliders(updatedSliders);
            } else {
                setSliders(sliders.map(slider => ({ ...slider, value: 0 }))); // Reset to default if no data
            }
        } catch (error) {
            console.error('Failed to fetch ratings', error);
            toast.error('Failed to fetch ratings. Please try again.');
            setSliders(sliders.map(slider => ({ ...slider, value: 0 }))); // Reset to default in case of error
        }
    };

    useEffect(() => {
        fetchUserRatings(); // Fetch ratings when component mounts
    }, []);
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
            // onRatingSave();
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
