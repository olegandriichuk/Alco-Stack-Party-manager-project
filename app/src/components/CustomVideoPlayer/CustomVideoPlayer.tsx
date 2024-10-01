import React, { useEffect, useState } from 'react';
import './CustomVideoPlayer.css'; // Підключаємо CSS файл

interface CustomVideoPlayerProps {
    videoSrc: string; // Відеофайл
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoSrc }) => {
    const [isMobile, setIsMobile] = useState(false);

    // Функція для перевірки ширини екрану
    const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768); // Наприклад, мобільний розмір для пристроїв шириною <= 768px
    };

    useEffect(() => {
        checkScreenSize(); // Перевірка при першому рендері
        window.addEventListener('resize', checkScreenSize); // Перевірка при зміні розміру вікна
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className={`player-container ${isMobile ? 'mobile' : 'desktop'}`}>
            <video className="video" controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default CustomVideoPlayer;
