import React from 'react';
import { Card } from 'react-bootstrap';

export type CocktailCardProps = {
    cocktail: {
        id: string;
        name: string;
        photo: string;
    };
    onClick: (id: string) => void; // Click handler
};

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, onClick }) => {
    return (
        <Card
            style={{ width: '100px', margin: '10px', cursor: 'pointer' }}
            onClick={() => onClick(cocktail.id)} // Trigger handler on click
        >
            <Card.Img variant="top" src={cocktail.photo} alt={cocktail.name} />
            <Card.Body>
                <Card.Title>{cocktail.name}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default CocktailCard;
