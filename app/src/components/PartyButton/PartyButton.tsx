// src/components/PartyButton.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUsers, faCake} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface PartyButtonProps {
    title: string;
    description: string;
    date: string;
    type: '#708ff0' | '#cf6165';
}

const PartyButton: React.FC<PartyButtonProps> = ({ title, description, date, type }) => {
    const ButtonStyle = { backgroundColor: type, color: 'black' };

    return (
        <button className="btn party-button m-1" style={ButtonStyle}>
            <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center">
                    <div className="me-3">
                        {type === '#708ff0' ? (
                            <FontAwesomeIcon icon={faCake} size="2x"/>
                        ) : (
                            <FontAwesomeIcon icon={faUsers} size="2x"/>
                        )}
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="mb-0 text-start">{title}</h5>
                        <p className="mb-0 text-start">{description}</p>
                    </div>
                </div>
                <div className="text-end">
                    <span>{date}</span>
                </div>
            </div>
        </button>
    );
};

export default PartyButton;
