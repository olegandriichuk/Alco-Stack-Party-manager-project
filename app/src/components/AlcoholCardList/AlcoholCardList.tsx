import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {AlcoholGet} from "../../Models/Alcohol.tsx";
import AlcoholCard from "../AlcoholCard/AlcoholCard.tsx";

// Define the type for the list component props
export type AlcoholListProps = {
    alcohols: AlcoholGet[];
};

// Define the AlcoholList component
const AlcoholList: React.FC<AlcoholListProps> = ({ alcohols }) => {
    return (
        <Container>
            <Row>
                {alcohols.map((alcohol, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <AlcoholCard alcohol={alcohol} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AlcoholList;
