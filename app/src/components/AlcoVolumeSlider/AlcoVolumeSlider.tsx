import React from "react";
import "./AlcoVolumeSlider.css";

// Define the type for the component props
interface SliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;

}

const AlcoVolumeSlider: React.FC<SliderProps> = ({
                                                     label,
                                                     value,
                                                     onChange,
                                                     // imageSrc
                                                 }) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseFloat(e.target.value)); // Parse as a float to handle decimal values
    };

    return (
        <div className="select-slider-container" style={{ width: '100%'}}>
            <div className="select-alcohol-slider-header">

                <span className="select-alcohol-slider-label">{label}</span>
            </div>
            <input
                type="range"
                className="select-alcohol-slider-range"
                min="0"
                max="10"
                step="0.1" // Allow decimal steps
                value={value}
                onChange={handleSliderChange}
            />
            <span className="select-alcohol-slider-value" >{value.toFixed(1)} l</span> {/* Display current value with one decimal place */}
        </div>
    );
};

export default AlcoVolumeSlider;
