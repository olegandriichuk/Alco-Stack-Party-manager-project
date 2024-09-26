import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from "../Slider/Slider";

interface SliderItem {
    label: string;
    value: number;
    imageSrc: string; // Include the image source
    onChange: (value: number) => void;
}

interface SliderListProps {
    sliders: SliderItem[]; // Array of sliders
}

const SliderList: React.FC<SliderListProps> = ({ sliders }) => {
    return (
        <div className="sliderlist-container d-flex flex-column align-items-center">
            <div className="row justify-content-center">
                {sliders.map((slider, index) => (
                    <div key={index} className="col-12 mb-3 mt-2 d-flex justify-content-center">
                        <Slider
                            label={slider.label}
                            value={slider.value}
                            onChange={slider.onChange}
                            imageSrc={slider.imageSrc} // Pass the image source
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SliderList;
