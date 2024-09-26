import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Disco from '../../assets/disco.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import HalantBold from '../../assets/fonts/halant/Halant-Bold.ttf';
import HalantSemiBold from '../../assets/fonts/halant/Halant-SemiBold.ttf';
import backgroundImage from '../../assets/backcov1.svg';

const WelcomePage: React.FC = () => {
    const isMobile = window.innerWidth <= 768;
    return (
        <div
            className="container-fluid p-0 d-flex flex-column align-items-center"
            style={{
                backgroundColor: '#DDE4EE', // Цвет фона
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: isMobile ? '0px, 10px' : '15px, 10px',
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
                    <FontAwesomeIcon icon={faHome} size="2x" color="black" />
                </Link>
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl m-1 mt-3 mb-2 text-center">
                WELCOME TO ALKO STACK!!!
            </h2>

            <p className="text-base md:text-lg lg:text-xl m-5 mt-3">
                Hey there, party animal! 🎉 Ready for a night of unforgettable memories and maybe a few questionable
                decisions? Alko Stack turns planning a party into a personal fiesta!
                <br /><br />
                Your Party, Your Rules Ever wish you could magically create a party? We’ve got the next best thing: a
                personalized party form that makes you the star! Whether you're a Margarita maestro or a Beer pong
                legend, fill out your details, and let Alko Stack craft the perfect bash just for you.
                <br /><br />
                It’s like having a party planner in your pocket! Create and Invite: The More, The Merrier! Creating a
                party on Alko Stack is as easy as popping a bottle of bubbly. Just a few taps, and voilà – you’ve got a
                shindig! Invite your friends, frenemies, and that cool neighbor who never complains. Your guests can
                RSVP with a single tap, so you’ll know who’s joining the fun.
                <br /><br />
                So, what are you waiting for? Dive into Alko Stack and let’s get this party started! The best nights are
                the ones you can't remember, with the people you won’t forget. Cheers! 🍻
            </p>
        </div>
    );
};

export default WelcomePage;
