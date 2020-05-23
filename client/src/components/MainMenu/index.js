import React from 'react';
import Button from '../Button';

import './MainMenu.scss';

const MainMenu = () => {
    return (
        <div className="main-menu">
            <Button label={'Host Lobby'}></Button>
            <Button label={'Join Lobby'}></Button>
        </div>
    )
}

export default MainMenu;