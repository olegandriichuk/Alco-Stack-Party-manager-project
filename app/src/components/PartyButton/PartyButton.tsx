import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUsers, faCake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PartyButtonProps {
    name: string;
    description: string;
    date: string;
    createdByMe: boolean;
}

const PartyButton: React.FC<PartyButtonProps> = ({ name, description, date, createdByMe }) => {
    const ButtonStyle = { backgroundColor: createdByMe ? '#f07070' : '#708ff0' };

    // Format date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', // 'short', 'narrow' can also be used
        year: 'numeric',
        month: 'long',   // '2-digit' for numeric month
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));

    return (
        <button className="btn party-button m-1" style={ButtonStyle}>
            <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center">
                    <div className="me-3">
                        {createdByMe ? (
                            <FontAwesomeIcon icon={faUsers} size="2x"/>
                        ) : (
                            <FontAwesomeIcon icon={faCake} size="2x"/>
                        )}
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="mb-0 text-start">{name}</h5>
                        <p className="mb-0 text-start">{description}</p>
                    </div>
                </div>
                <div className="text-end">
                    <span>{formattedDate}</span>
                </div>
            </div>
        </button>
    );
};

export default PartyButton;
