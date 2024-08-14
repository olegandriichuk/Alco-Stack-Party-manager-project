import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './MenuButtonList.css';
import 'bootstrap/dist/css/bootstrap.min.css';



interface MenuButton {
    text: string;
    icon: IconDefinition; // Could be a string for class names or JSX.Element for a component
    color: string;
}

interface MenuButtonListProps {
    menuButtons: MenuButton[];
}

const MenuButtonList: React.FC<MenuButtonListProps> = ({ menuButtons }) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {menuButtons.map((menuButton, index) => (
                    <div key={index} className="col-md-4 col-4 mb-4 mt-2">
                        <MenuButton
                            text={menuButton.text}
                            icon={menuButton.icon}
                            color={menuButton.color}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuButtonList;