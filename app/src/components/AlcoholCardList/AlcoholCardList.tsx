import React from 'react';
import { Container } from 'react-bootstrap';
import AlcoholCard from '../AlcoholCard/AlcoholCard';
import alcorankborder from '../../assets/alko rank border.svg';

// Типы данных для алкоголя
import { AlcoholGet } from '../../Models/Alcohol.tsx';

export type AlcoholListProps = {
    alcohols: AlcoholGet[];
};

const AlcoholList: React.FC<AlcoholListProps> = ({ alcohols }) => {
    return (
        <div style={{ position: 'absolute', top: 500, left: '35%', transform: 'translateX(-50%)' }}>
            {/* Заголовок */}
            <div
                style={{
                    position: 'absolute',
                    top: '-50px', // Сдвиг над списком
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <img
                    src={alcorankborder}
                    alt="Alco Ranking Border"
                    style={{ width: '500px', height: 'auto' }} // Размер заголовка
                />
            </div>

            {/* Вертикальный список */}
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '15px 0',
                    overflowY: 'auto', // Вертикальная прокрутка
                    maxHeight: '200px', // Ограничение высоты
                    width: '520px', // Фиксированная ширина
                    scrollBehavior: 'smooth',
                    zIndex: 10, // Устанавливаем над другими элементами
                }}
            >
                {alcohols.map((alcohol, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px',
                            borderRadius: '10px',
                            background: 'transparent', // Убираем фон
                            position: 'relative',
                        }}
                    >
                        {/* Карточка алкоголя */}
                        <AlcoholCard alcohol={alcohol} rank={index + 1} />

                        {/* Медали для первых трёх */}
                        {/*{index < 3 && (*/}
                        {/*    <img*/}
                        {/*        src={'../../assets/medal1.svg'}*/}
                        {/*        alt={`Medal ${index + 1}`}*/}
                        {/*        style={{*/}
                        {/*            position: 'absolute',*/}
                        {/*            top: '10px',*/}
                        {/*            right: '10px',*/}
                        {/*            width: '30px',*/}
                        {/*            height: '30px',*/}
                        {/*            zIndex: 20,*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*)}*/}
                    </div>
                ))}
            </Container>

        </div>
    );
};

export default AlcoholList;
