import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Card.css";

interface CardProps {
    name: string;
    icon: IconDefinition;
    color: string; // Add color prop
}

const Card: React.FC<CardProps> = ({ name, icon, color }) => {
    const cardStyle: React.CSSProperties = {
        backgroundColor: color,
    };

    return (
        <div className="card" style={cardStyle}>
            <div className="card-body text-center" >
                <h5 className="card-title">
                    <FontAwesomeIcon icon={icon} size="2x" />
                </h5>
                <p className="card-text">{name}</p>
            </div>
        </div>
    );
};

export default Card;
