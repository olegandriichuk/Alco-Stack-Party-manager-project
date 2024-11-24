import React from 'react';
import alcorankback from "../../assets/alcorankback.svg";
import { AlcoholGet } from '../../Models/Alcohol.tsx';

// Типы данных для пропсов компонента
export type AlcoholCardProps = {
    alcohol: AlcoholGet;
    rank: number;
};

// Компонент AlcoholCard
const AlcoholCard: React.FC<AlcoholCardProps> = ({ alcohol, rank }) => {
    return (
        <div
            style={{
                width: '520px', // Подстраиваем ширину под список
                height: '50px', // Высота карточки
                backgroundImage: `url(${alcorankback})`, // Фон карточки
                backgroundSize: 'cover', // Полное покрытие фона
                backgroundPosition: 'center', // Центрирование фона
                borderRadius: '8px', // Закругленные углы
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none', // Убираем обводку
                color: 'white', // Цвет текста
                fontFamily: 'Halant, serif', // Используем шрифт Halant
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Эффект тени для текста
                textAlign: 'center', // Центрирование текста
                fontSize: '1.5rem', // Размер текста
            }}
        >
            {alcohol.name} {/* Название алкоголя */}
            <span
                style={{
                    position: 'absolute', // Позиционируем относительно контейнера
                    right: '30px',
                    fontSize: '1.5rem',
                    fontFamily: 'Halant, serif', // Шрифт для номера
                }}
            >
                {rank}
            </span>
        </div>
    );
};

export default AlcoholCard;
