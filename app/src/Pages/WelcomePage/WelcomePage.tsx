import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Disco from '../../assets/disco.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
//import HalantBold from '../../assets/fonts/halant/Halant-Bold.ttf';
//import HalantSemiBold from '../../assets/fonts/halant/Halant-SemiBold.ttf';
import backgroundImage from '../../assets/backgroundFinal.svg';
// import video from '../../assets/viddd2.mp4';
// import zaskolko from '../../assets/khoda.mp4';
// import CustomVideoPlayer from '../../components/CustomVideoPlayer/CustomVideoPlayer.tsx';
import './WelcomePage.css';
const WelcomePage: React.FC = () => {
    //const isMobile = window.innerWidth <= 768;

    return (
        <div className="container-fluid d-flex p-0 full-height-welcome"
             style={{
                 backgroundImage: `url(${backgroundImage})`,
                 backgroundSize: 'cover',
             }}>
            <div className="video-left flex-grow-1">
                {/*<video className="background-video-welcome left" autoPlay loop muted>*/}
                {/*    <source src={video} type="video/mp4"/>*/}
                {/*    Your browser does not support the video tag.*/}
                {/*</video>*/}
            </div>
            <div
                className="container-fluid p-0 d-flex flex-column align-items-center custom-background square-container-welcome flex-grow-7"
                style={{
                    //backgroundColor: '#DDE4EE', // Цвет фона
                    //backgroundImage: `url(${backgroundImage})`,
                    // backgroundSize: 'cover',
                    // backgroundPosition: isMobile ? '0px, 10px' : '12px, -10px',
                    // backgroundRepeat: 'no-repeat',
                    // minHeight: '100vh',
                }}>
        {/*        <style>*/}
        {/*            {`*/}
        {/*        @font-face {*/}
        {/*            font-family: 'Halant-Bold';*/}
        {/*            src: url(${HalantBold}) format('truetype');*/}
        {/*        }*/}

        {/*        @font-face {*/}
        {/*            font-family: 'Halant-SemiBold';*/}
        {/*            src: url(${HalantSemiBold}) format('truetype');*/}
        {/*        }*/}
        {/*        */}
        {/*        @font-face {*/}
        {/*                font-family: 'VT323';*/}
        {/*                src: url(${VTfont}) format('truetype');*/}
        {/*        }*/}

        {/*        h1 {*/}
        {/*            font-family: 'Halant-Bold', sans-serif;*/}
        {/*        }*/}

        {/*        p {*/}
        {/*            font-family: 'Halant-SemiBold', sans-serif;*/}
        {/*        }*/}
        {/*        */}
        {/*        .square-container {*/}
        {/*                position: relative;*/}
        {/*                width: 100%;*/}
        {/*                height: auto;*/}
        {/*                max-width: 800px;*/}
        {/*                max-height: 1500px;*/}
        {/*                margin: 0 auto;*/}
        {/*                background-color: white;*/}
        {/*                border-radius: 10px;*/}
        {/*                box-shadow: 0 8px 30px rgba(255, 255, 255, 1), /* Основная большая тень */}
        {/*                            0 5px 15px rgba(255, 255, 255, 1); /* Дополнительная мягкая тень */}
        {/*                z-index: 1;*/}
        {/*        }*/}
        {/*   */}
        {/*        /* Keyframes for scrolling text */}
        {/*        @keyframes scrollText {*/}
        {/*                0% {*/}
        {/*                    transform: translateX(-100%); /* Start off-screen from the left */}
        {/*                }*/}
        {/*                100% {*/}
        {/*                    transform: translateX(245%); /* End off-screen to the right */}
        {/*                }*/}
        {/*        }*/}
        {/*        */}
        {/*        */}
        {/*        */}
        {/*        @keyframes blink {*/}
        {/*    0%, 100% {*/}
        {/*        opacity: 1; /* Fully visible */}
        {/*    }*/}
        {/*    50% {*/}
        {/*        opacity: 0; /* Fully invisible */}
        {/*    }*/}
        {/*}*/}
        {/*        `}*/}
        {/*        </style>*/}

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

                <h2 className="text-2xl md:text-4xl lg:text-5xl m-1 mt-3 mb-2 text-center-welcome">
                    WELCOME TO ALKO STACK!!!
                </h2>

                <p className="text-sm md:text-xl lg:text-2xl m-5 mt-3 welcome">
                    Hey there, party animal! 🎉 Ready for a night of unforgettable memories and maybe a few questionable
                    decisions? Alko Stack turns planning a party into a personal fiesta!
                    <br/><br/>
                    Your Party, Your Rules Ever wish you could magically create a party? We’ve got the next best thing:
                    a
                    personalized party form that makes you the star! Whether you're a Margarita maestro or a Beer pong
                    legend, fill out your details, and let Alko Stack craft the perfect bash just for you.
                    It’s like having a party planner in your pocket!
                    <br/><br/>
                    Create and Invite: The More, The Merrier! Creating
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
                {/*<CustomVideoPlayer videoSrc={zaskolko}/>*/}
                {/*<div className={`rectangle ${isMobile ? 'rectangle-mobile' : 'rectangle-desktop'}`}>*/}
                {/*    <div className="scrolling-text-welcome">*/}
                {/*        Welcome to the Party!!!*/}
                {/*    </div>*/}
                {/*    <div className="scrolling-line-welcome">*/}
                {/*        ✦♪✦♫✦♪✦♫✦♪✦♫✦♪✦✦♪✦♫✦♪✦♫✦♪✦♫✦♪✦♫*/}


                {/*    </div>*/}
                {/*</div>*/}
            </div>

        </div>
    );
};

export default WelcomePage;
