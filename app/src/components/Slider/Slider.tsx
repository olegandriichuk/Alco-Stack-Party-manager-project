import React from 'react';
import './Slider.css';

interface SliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
   // toggle: boolean;
    //onToggleChange: () => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange/* toggle, onToggleChange */ }) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value, 10));
    };

    return (
        <div className="slider-container">
            <span className="slider-label">{label}</span>
            <input
                type="range"
                className="slider-range"
                min="0"
                max="10"
                value={value}
                onChange={handleSliderChange}
            />
            {/*<button className={`slider-toggle ${toggle ? 'on' : 'off'}`} onClick={onToggleChange}>*/}
            {/*    <div className="toggle-circle"></div>*/}
            {/*</button>*/}
            <span className="slider-value">{value}</span> {/* Відображаємо поточне значення */}
        </div>
    );
};

export default Slider;
