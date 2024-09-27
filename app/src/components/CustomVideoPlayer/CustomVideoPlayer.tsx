import React, { useEffect, useState } from 'react';

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

    const playerContainerStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#000', // Чорний фон контейнера
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '2px',
        marginTop: '-30px',
        border: '4px solid #333', // Базовий стиль для рамки
        borderRadius: '20px',  // Заокруглення сірої рамки
        width: isMobile ? '300px' : '500px',  // Для мобільних пристроїв ширина буде меншою
        height: isMobile ? '180px' : '300px', // Для мобільних пристроїв висота буде меншою
        padding: '10px',
    };

    const videoStyles: React.CSSProperties = {
        width: '100%',           // Відео займає всю ширину контейнера
        height: '100%',          // Відео займає всю висоту контейнера
        objectFit: 'cover',      // Відео буде обрізатися для заповнення контейнера без спотворення
        borderRadius: '15px',    // Заокруглення для відео
        boxShadow: '0 0 0 2px #2C2E2E, 0 0 0 4px #161616', // Імітація додаткових рамок через тіні
    };

    return (
        <div style={playerContainerStyles}>
            <video style={videoStyles} controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default CustomVideoPlayer;