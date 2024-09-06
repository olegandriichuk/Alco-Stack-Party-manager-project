import React from 'react';
import './LowAlcoPage.css';
import { useNavigate } from 'react-router-dom';

const LowAlcoPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container blurred-background">
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
            <div className="content">
                <h2>This is the Low Alco Page</h2>
            </div>
        </div>
    );
};

export default LowAlcoPage;
