import React, { useState, useEffect } from "react";
import './WineAlcoRatingPopUp.css';
import SliderList from "../../../components/SliderList/SliderList";
import martini from "../../../assets/martini.jpg";
import sweet_vermouth from "../../../assets/sweet_vermouth.jpg";
import champagne from "../../../assets/champagne.jpg";
import dubonnet from "../../../assets/dubonnet.jpg";
import prosecco from "../../../assets/dubonnet.jpg";
import { UpdateAlcoholRatingsAPI, GETAlcoholRatingsAPI } from "../../../Services/AlcoholService.tsx";
import {useAuth} from "../../../Context/useAuth.tsx";
//import {SliderAlcoholPatch} from "../../../Models/Alcohol.tsx"; // Імпортуємо сервіс для збереження
import { toast } from "react-toastify";
interface WineRatingPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const WineRatingPopUp: React.FC<WineRatingPopUpProps> = ({ show, handleClose }) => {
    const { user, token } = useAuth();
    const [sliders, setSliders] = useState([
        {id: "45505103-792d-44b1-a3fd-595016820885", label: 'Sweet Vermouth', value: 0 ,imageSrc: sweet_vermouth },
        {id: "6841e096-c169-4d51-96ed-382937403d80",  label: 'Dry Vermouth',value: 0,imageSrc: martini },
        {id: "3a7737b9-9b9a-49b2-a247-7bdab2cc203e", label: 'Champagne',  value: 0 , imageSrc: champagne},
        {id: "3a12ed91-e016-48a9-9c89-adf99c83e6e9",  label: 'Dubonnet Rouge', value: 0,  imageSrc: dubonnet },
        {id: "da66009b-09ae-4fc6-a9f9-471b5fb8fda7",  label: 'Prosecco', value: 0 ,  imageSrc: prosecco}
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
    const [isSaving, setIsSaving] = useState(false);
    // Обробник зміни значення слайдера
    const saveRatings = async () => {
        if (!user || !token) {
            console.log("userName:", user);
            console.log("authToken:", token);
            console.error("userName або authToken не визначені");
            return;
        }

        setIsSaving(true); // Починаємо процес збереження
        const type = 2; // Приклад типу алкоголю
        const ratings = sliders.map(slider => ({
            AlcoholId: slider.id,
            rating: slider.value
        }));

        try {
            const result = await UpdateAlcoholRatingsAPI(user.userName, type, ratings, token);
            console.log("Updated wine ratings:", result);
            // onRatingSave();
            handleClose(); // Закрити вікно після успішного збереження
        } catch (error) {
            console.error("Failed to update ratings", error);
        } finally {
            setIsSaving(false); // Завершуємо процес збереження
        }
    };
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
                        <button className="midalco-btn-save" onClick={saveRatings} disabled={isSaving}>{isSaving ? "Saving..." : "Save"}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WineRatingPopUp;
