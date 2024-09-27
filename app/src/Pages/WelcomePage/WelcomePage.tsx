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
import VTfont from '../../assets/fonts/VT323-Regular.ttf';

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

    const rectangleStyles: React.CSSProperties = {
        width: isMobile ? '300px' : '440px',
        height: isMobile ? '180px' : '50px',
        background: 'linear-gradient(180deg, #827E7D 9%, #2B2B2B 31%)',
        border: '4px solid transparent',
        borderImage: 'linear-gradient(180deg, #2C2E2E 0%, #161616 100%) 1',
        marginBottom: '20px',
        boxSizing: 'border-box',
        boxShadow: '0 0 0 2px grey',
        fontFamily: '"VT323", monospace',
        fontSize: '20px',
        fontWeight: 'normal',
        lineHeight: '1',
        overflow: 'hidden',
        position: 'relative',
    };

    const scrollingTextStyles: React.CSSProperties = {
        position: 'absolute',
        whiteSpace: 'nowrap', // Prevent text wrapping
        //animation: 'scrollText 5s linear infinite', // Animation over 5 seconds
        left: '0', // Start from the left edge of the rectangle
        fontWeight: 'bold', // You can make the text bold for better visibility
        animation: 'scrollText 5s linear infinite, blink 1s infinite', // Combine animations
        color: '#FFFFFF',
        textShadow: '2px 2px 4px rgba(128, 128, 128, 0.7)', // Grey drop shadow effect
    };

    const scrollingLine: React.CSSProperties = {
        position: 'relative',
        marginTop: '20px',
        fontWeight: 'bold',
        //animation: 'scrollText 10s linear infinite',
        color: '#94B7EF',
        //whiteSpace: 'nowrap',
        width: '400%', // Ширина лінії набагато більша за контейнер
        textShadow: '2px 2px 4px rgba(128, 128, 128, 0.7)', // Grey drop shadow effect
    };


    // const blinkAnimation: React.CSSProperties = {
    //     position: 'absolute',
    //     whiteSpace: 'nowrap', // Prevent text wrapping
    //     animation: 'blink 1s infinite', // Animation over 5 seconds
    //     left: '0', // Start from the left edge of the rectangle
    // };


    // const textStyles: React.CSSProperties = {
    //     width: '292px', // Ширина
    //     height: '20px', // Висота
    //     color: '#E5CD10', // Жовтий колір тексту (Fill: #E5CD10)
    //     fontFamily: '"VT323", monospace', // Шрифт VT323
    //     fontSize: '20px', // Розмір шрифту
    //     fontWeight: 'normal', // Регулярний текст
    //     lineHeight: '1', // Лінійна висота
    //     textAlign: 'center', // Текст вирівняний по центру
    //     margin: '20px 0', // Відступ зверху і знизу
    //     filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5))', // Drop shadow ефект
    // };



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
                
                @font-face {
                        font-family: 'VT323';
                        src: url(${VTfont}) format('truetype');
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
           
                /* Keyframes for scrolling text */
                @keyframes scrollText {
                        0% {
                            transform: translateX(-100%); /* Start off-screen from the left */
                        }
                        100% {
                            transform: translateX(245%); /* End off-screen to the right */
                        }
                }
                
                
                
                @keyframes blink {
            0%, 100% {
                opacity: 1; /* Fully visible */
            }
            50% {
                opacity: 0; /* Fully invisible */
            }
        }
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
                <CustomVideoPlayer videoSrc={zaskolko}/>
                <div style={rectangleStyles}>
                    <div style={scrollingTextStyles}>
                        Welcome to the Party!!!
                    </div>
                    <div style={scrollingLine}>
                        ✦♪✦♫✦♪✦♫✦♪✦♫✦♪✦✦♪✦♫✦♪✦♫✦♪✦♫✦♪✦♫


                    </div>
                </div>
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
