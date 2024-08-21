import {faHome } from '@fortawesome/free-solid-svg-icons';
import Disco from '../../assets/disco.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from 'react';
import {Link} from 'react-router-dom';

const WelcomePage: React.FC = () => {
    return (
        <div className="container-fluid p-0 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                    <img
                        src={Disco} // Adjust the path to your party icon
                        alt="Party Icon"
                        width="80"
                        height="80"
                    />
                </div>
                <Link
                    to="/home" // Path to the homepage route
                    className="p-2"
                    aria-label="Go to Homepage" // Accessibility feature
                >
                    <FontAwesomeIcon icon={faHome} size="2x" color="black" />
                </Link>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl m-1 mt-3 mb-2 text-center">WELCOME TO ALKO STACK!!!</h1>
            <p className="text-base md:text-lg lg:text-xl m-5 mt-3">
                Hey there, party animal! 🎉 Ready for a night of unforgettable memories and maybe a few questionable
                decisions?
                Alko Stack turns planning a party into a personal fiesta!
                <br/><br/>
                Your Party, Your Rules Ever wish you could magically create a party? We’ve got the next best thing: a
                personalized party form that makes you the star! Whether you're a Margarita maestro or a Beer pong
                legend, fill out your details, and let Alko Stack craft the perfect bash just for you.
                <br/><br/>
                It’s like having a party planner in your pocket! Create and Invite: The More, The Merrier! Creating a
                party on Alko Stack is as easy as popping a bottle of bubbly. Just a few taps, and voilà – you’ve got a
                shindig! Invite your friends, frenemies, and that cool neighbor who never complains. Your guests can
                RSVP with a single tap, so you’ll know who’s joining the fun.
                <br/><br/>
                So, what are you waiting for? Dive into Alko Stack and let’s get this party started! The best nights are
                the ones you can't remember, with the people you won’t forget. Cheers! 🍻
            </p>
        </div>
    );
};

export default WelcomePage;

