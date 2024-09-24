import React from 'react';

// Определяем интерфейс для пропсов
interface CustomVideoPlayerProps {
    videoSrc: string; // Указываем, что videoSrc — это строка
}

const isMobile = window.innerWidth <= 768;

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoSrc }) => {
    const playerStyles: React.CSSProperties = {
        backgroundColor: '#000',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
        position: 'relative', // Здесь используем допустимое значение 'relative'
        marginBottom: '40px',
        border: '2px solid #ddd',
        width: '60%', // Ширина плеера
        height: '70%',
        maxHeight: isMobile ? '137px' : '272px',
    };



    return (
        <div style={playerStyles}>
            <video width="100%" height="100%" controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default CustomVideoPlayer;
