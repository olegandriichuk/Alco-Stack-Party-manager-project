import React from 'react';
import Card from '../Card/Card';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './CardList.css';

interface CardListProps {
    cards: {
        name: string;
        icon: IconDefinition;
        color: string;
    }[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
    return (
        <div className="card-list">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    name={card.name}
                    icon={card.icon}
                    color={card.color}
                />
            ))}
        </div>
    );
};

export default CardList;
