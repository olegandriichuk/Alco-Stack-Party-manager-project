import React, {useEffect, useState} from "react";
import './LowAlcoRatingPopUp.css';
//import Slider from "../../../components/Slider/Slider.tsx";
import SliderList from "../../../components/SliderList/SliderList";
import {useAuth} from "../../../Context/useAuth.tsx";
import {toast} from "react-toastify";
import {GETAlcoholRatingsAPI, UpdateAlcoholRatingsAPI} from "../../../Services/AlcoholService.tsx";
import apricot_brandy from "../../../assets/Apricot brandy.jpg";

interface LowAlcoRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const LowAlcoRatingPopUp: React.FC<LowAlcoRatingPopUpProps> = ({ show, handleClose }) => {
    const { user, token } = useAuth();
    const [sliders, setSliders] = useState([
        { id: 'a745bc6e-14d2-45f5-a0b4-9ee8b7936754', label: 'Beer', value: 0, imageSrc: apricot_brandy, toggle: false },
        { id: '0dec2807-98c9-4d48-a698-81ca5c3fd04c', label: 'Cider', value: 0, imageSrc: apricot_brandy, toggle: false },
        { id: 'dccfaddc-7907-42a4-85a1-ed392926beaa', label: 'Lager beer', value: 0, imageSrc: apricot_brandy, toggle: false },
        { id: 'be695724-d48f-4131-b9df-9d2bbb028796', label: 'Ale', value: 0, imageSrc: apricot_brandy, toggle: false },
        { id: '94544897-cd6a-45b4-9bbc-1eaf7929fac9', label: 'Dark beer', value: 0, imageSrc: apricot_brandy, toggle: false },
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
        const type = 1; // Приклад типу алкоголю
        const ratings = sliders.map(slider => ({
            AlcoholId: slider.id,
            rating: slider.value
        }));

        try {
            const result = await UpdateAlcoholRatingsAPI(user.userName, type, ratings, token);
            console.log("Updated beer ratings:", result);
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
            <div className="lowalco-modal-backdrop-blur" onClick={handleBackdropClick}/> {/* Заблюрений фон */}
            <div className="lowalco-modal-container">
                <div className="lowalco-modal-content">
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

export default LowAlcoRatingPopUp;
