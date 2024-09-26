// src/components/PartyButtonList.tsx
import React from 'react';
import PartyButton from '../PartyButton/PartyButton';
import 'bootstrap/dist/css/bootstrap.min.css';

import './PartyButtonList.css';

interface PartyButtonListProps {
    parties: {
        partyId: string;
        name: string;
        description: string;
        date: string;
        createdByMe: boolean;
    }[];
}

const PartyButtonList: React.FC<PartyButtonListProps> = ({ parties }) => {
    const partyStyle: React.CSSProperties = {
        background: 'linear-gradient(to right, rgba(74, 67, 67, 0.65), rgba(176, 159, 159, 0.65))',
        color: '#FFFFFF',
        fontFamily: 'Halant Medium',
    };

    console.log('parties:', parties);
    return (
        <div className="list-group w-100">
            {
            <h4 className="p-2 rounded-top-4" style={partyStyle}>Your Parties</h4>}
            {parties.map((party, index) => (
                <PartyButton
                    key={index}
                    partyId={party.partyId}
                    name={party.name}
                    description={party.description}
                    date={party.date}
                    createdByMe={party.createdByMe}
                />
            ))}
        </div>
    );
};

export default PartyButtonList;
