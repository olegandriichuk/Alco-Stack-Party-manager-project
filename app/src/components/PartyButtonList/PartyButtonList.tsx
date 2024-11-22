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
    return (
        <div className="w-
        100">
            {/* Заголовок поза скрол-контейнером */}
            <h4 className="party-header">Your Parties</h4>

            {/* Скрол-контейнер для списку партій */}
            <div className="scroll-container w-100">
                <div className="list-group w-100">
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
            </div>
        </div>
    );
};

export default PartyButtonList;
