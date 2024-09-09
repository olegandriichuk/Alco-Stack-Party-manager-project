import React from 'react';
//import './ChooseAlcoButtonList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from "../Slider/Slider";



interface SliderItem {
    label: string;
    value: number;
    toggle: boolean;
    onChange: (value: number) => void;
    onToggleChange: () => void;
}

interface SliderListProps {
    sliders: SliderItem[]; // Масив слайдерів
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
                            toggle={slider.toggle}
                            onToggleChange={slider.onToggleChange}
                        />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default SliderList;
