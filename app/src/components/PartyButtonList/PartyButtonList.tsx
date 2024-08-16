// src/components/PartyButtonList.tsx
import React from 'react';
import PartyButton from '../PartyButton/PartyButton';
import 'bootstrap/dist/css/bootstrap.min.css';

import './PartyButtonList.css';

interface PartyButtonListProps {
    parties: {
        title: string;
        description: string;
        date: string;
        type: '#708ff0' | '#cf6165';
    }[];
}

const PartyButtonList: React.FC<PartyButtonListProps> = ({ parties }) => {
    const partyStyle: React.CSSProperties = {
        background: 'linear-gradient(to right, #333333, #d3d3d3)',
        color: '#d5d5d5',
    };


    return (
        <div className="list-group w-100">
            {
            <h4 className="p-2 rounded-top-4" style={partyStyle}>Your Parties</h4>}
            {parties.map((party, index) => (
                <PartyButton
                    key={index}
                    title={party.title}
                    description={party.description}
                    date={party.date}
                    type={party.type}
                />
            ))}
        </div>
    );
};

export default PartyButtonList;
