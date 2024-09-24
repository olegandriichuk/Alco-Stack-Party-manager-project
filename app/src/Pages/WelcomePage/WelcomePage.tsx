import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Disco from '../../assets/disco.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import HalantBold from '../../assets/fonts/halant/Halant-Bold.ttf';
import HalantSemiBold from '../../assets/fonts/halant/Halant-SemiBold.ttf';
import backgroundImage from '../../assets/backcov1.svg';
import video from '../../assets/viddd2.mp4';
import zaskolko from '../../assets/khoda.mp4';
import CustomVideoPlayer from '../../components/CustomVideoPlayer/CustomVideoPlayer.tsx';

const WelcomePage: React.FC = () => {
    const isMobile = window.innerWidth <= 768;

    const videoStyles : React.CSSProperties = {
        position: isMobile ? 'static' : 'fixed',
        top: 0,
        // width: isMobile ? '100%' : `${28 / zoomLevel}%`,
        height: isMobile ? '0vh' : '100vh',
        objectFit: 'cover' as const,
        zIndex: -1,
        boxSizing: 'border-box',

    };

    return (
        <div className="container-fluid d-flex p-0" style={{minHeight: '100vh'}}>
            <div className="video-left flex-grow-1">
                <video className="background-video left" style={{...videoStyles, width: isMobile ? '100%' : '45vw',}}
                       autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div
                className="container-fluid p-0 d-flex flex-column align-items-center custom-background square-container flex-grow-7"
                style={{
                    backgroundColor: '#DDE4EE', // Цвет фона
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: isMobile ? '0px, 10px' : '12px, -10px',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                }}>
                <style>
                    {`
                @font-face {
                    font-family: 'Halant-Bold';
                    src: url(${HalantBold}) format('truetype');
                }

                @font-face {
                    font-family: 'Halant-SemiBold';
                    src: url(${HalantSemiBold}) format('truetype');
                }

                h1 {
                    font-family: 'Halant-Bold', sans-serif;
                }

                p {
                    font-family: 'Halant-SemiBold', sans-serif;
                }
                
                .square-container {
                        position: relative;
                        width: 100%;
                        height: auto;
                        max-width: 800px;
                        max-height: 1500px;
                        margin: 0 auto;
                        background-color: white;
                        border-radius: 10px;
                        box-shadow: 0 8px 30px rgba(255, 255, 255, 1), /* Основная большая тень */
                                    0 5px 15px rgba(255, 255, 255, 1); /* Дополнительная мягкая тень */
                        z-index: 1;
                }
            
            // /* Эффект при наведении: увеличиваем элемент только на десктопе */
            // .square-container:hover {
            //     transform: perspective(1000px) scale(1.05);
            // }
            //
            // /* Отключаем увеличение для мобильных устройств с помощью медиа-запросов */
            // @media (max-width: 768px) {
            //     .square-container {
            //         transform: none; /* Отключаем любые трансформации */
            //         transition: none; /* Отключаем анимацию */
            //     }
            //
            //     .square-container:hover {
            //         transform: none; /* Убираем увеличение при наведении */
            //     }
            // }
                `}
                </style>

                <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <img
                            src={Disco}
                            alt="Party Icon"
                            width="80"
                            height="80"
                        />
                    </div>
                    <Link
                        to="/home"
                        className="p-2"
                        aria-label="Go to Homepage"
                    >
                        <FontAwesomeIcon icon={faHome} size="2x" color="black"/>
                    </Link>
                </div>

                <h2 className="text-2xl md:text-4xl lg:text-5xl m-1 mt-3 mb-2 text-center">
                    WELCOME TO ALKO STACK!!!
                </h2>

                <p className="text-sm md:text-xl lg:text-2xl m-5 mt-3">
                    Hey there, party animal! 🎉 Ready for a night of unforgettable memories and maybe a few questionable
                    decisions? Alko Stack turns planning a party into a personal fiesta!
                    <br/><br/>
                    Your Party, Your Rules Ever wish you could magically create a party? We’ve got the next best thing:
                    a
                    personalized party form that makes you the star! Whether you're a Margarita maestro or a Beer pong
                    legend, fill out your details, and let Alko Stack craft the perfect bash just for you.
                    <br/><br/>
                    It’s like having a party planner in your pocket! Create and Invite: The More, The Merrier! Creating
                    a
                    party on Alko Stack is as easy as popping a bottle of bubbly. Just a few taps, and voilà – you’ve
                    got a
                    shindig! Invite your friends, frenemies, and that cool neighbor who never complains. Your guests can
                    RSVP with a single tap, so you’ll know who’s joining the fun.
                    <br/><br/>
                    So, what are you waiting for? Dive into Alko Stack and let’s get this party started! The best nights
                    are
                    the ones you can't remember, with the people you won’t forget. Cheers! 🍻
                </p>
                <CustomVideoPlayer videoSrc={zaskolko} />
            </div>
            <div className="video-right flex-grow-1">
                <video className="background-video right"
                       style={{...videoStyles, right: 0, width: isMobile ? '100%' : '45vw',}} autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default WelcomePage;
