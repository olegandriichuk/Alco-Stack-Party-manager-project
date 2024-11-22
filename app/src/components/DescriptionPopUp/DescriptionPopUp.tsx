import React from 'react';

type DescriptionPopUpProps = {
    description: string;
    liquors: boolean;
    lowAlcohol: boolean;
    midAlcohol: boolean;
    highAlcohol: boolean;
    typesOfAlcohol: number;
    onClose: () => void; // Function to handle closing the pop-up
};

const DescriptionPopUp: React.FC<DescriptionPopUpProps> = ({
                                                               description,
                                                               liquors,
                                                               lowAlcohol,
                                                               midAlcohol,
                                                               highAlcohol,
                                                               typesOfAlcohol,
                                                               onClose,
                                                           }) => {
    // Dynamically create categories based on boolean values
    const categories = [];
    if (liquors) categories.push('Liquors');
    if (lowAlcohol) categories.push('Low Alcohol');
    if (midAlcohol) categories.push('Mid Alcohol');
    if (highAlcohol) categories.push('High Alcohol');

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    borderRadius: '10px',
                    maxWidth: '400px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <h3>Party Description</h3>
                <p>{description || 'No description provided.'}</p>
                <p>
                    <strong>Categories:</strong> {categories.length > 0 ? categories.join(', ') : 'None'}{' '}
                    ({categories.length})
                </p>
                <p>
                    <strong>Number of Alcohol Types:</strong> {typesOfAlcohol}
                </p>
                <button className="btn btn-dark mt-3" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default DescriptionPopUp;
