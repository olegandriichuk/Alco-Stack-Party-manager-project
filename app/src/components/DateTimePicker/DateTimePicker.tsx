import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DateTimePicker.css';
import icon_calendar from '../../assets/icon _calendar_.svg';

interface DatePickerComponentProps {
    value: string | undefined;
    onChange: (date: string | undefined) => void;
}

const CustomInput = React.forwardRef<HTMLInputElement, any>(
    ({ value, onClick, onClear }, ref) => (
        <div className="datepicker-input-wrapper">
            <input
                ref={ref}
                value={value}
                placeholder="Select Date"
                className="datepicker-input"
                readOnly
                onClick={onClick}
            />
            <img
                src={icon_calendar}
                alt="Calendar Icon"
                className="datepicker-icon"
                onClick={onClick}
            />
            {value && (
                <span
                    className="clear-icon"
                    onClick={onClear}
                >
                    &times; {/* Крестик для удаления */}
                </span>
            )}
        </div>
    )
);

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ value, onChange }) => {
    // Функция для очистки временной зоны
    const handleDateChange = (date: Date | null) => {
        if (date) {
            // Устанавливаем дату с обнулением времени
            const cleanDate = new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            );
            onChange(cleanDate.toISOString().split('T')[0]);
        } else {
            onChange(undefined);
        }
    };

    return (
        <div className="datepicker-wrapper">
            <label htmlFor="dateOfBirth" className="datepicker-title">Date of Birth</label>
            <DatePicker
                selected={value ? new Date(value) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Date"
                customInput={
                    <CustomInput
                        value={value}
                        onClick={() => {}}
                        onClear={() => onChange(undefined)} // Очистка даты
                    />
                }
            />
        </div>
    );
};

export default DatePickerComponent;
