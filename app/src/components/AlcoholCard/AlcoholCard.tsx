import React from 'react';
import { Card } from 'react-bootstrap';
import { AlcoholGet } from '../../Models/Alcohol.tsx';

// Define the type for the component props
export type AlcoholCardProps = {
    alcohol: AlcoholGet;
};

// Define the AlcoholCard component
const AlcoholCard: React.FC<AlcoholCardProps> = ({ alcohol }) => {
    // Determine the alcohol type label based on the numeric value
    const getAlcoholTypeLabel = (type: number) => {
        return type === 0
            ? 'Liquor'
            : type === 1
                ? 'Low Alcohol'
                : type === 2
                    ? 'Mid Alcohol'
                    : type === 3
                        ? 'High Alcohol'
                        : 'Unknown';
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={alcohol.photo} alt={alcohol.name} />
            <Card.Body>
                <Card.Title>{alcohol.name}</Card.Title>
                <Card.Text>
                    {alcohol.description}
                </Card.Text>
                <Card.Footer>
                    <small className="text-muted">
                        Type: {getAlcoholTypeLabel(alcohol.type)}
                    </small>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default AlcoholCard;
