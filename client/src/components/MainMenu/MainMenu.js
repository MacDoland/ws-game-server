import React from 'react';
import Button from '../Button';
import { useHistory } from "react-router-dom";

import './MainMenu.scss';

const MainMenu = () => {
    const history = useHistory();

    return (
        <div className="main-menu">
            <p>Welcome to my game server demo. Please choose from the following options:</p>
            <div className="main-menu__option"><Button onClick={()=>{history.push('/host')}}>Host Lobby</Button><p>Create a new lobby for people to join.</p></div>
            <div className="main-menu__option"><Button onClick={()=>{history.push('/join')}}>Join Lobby</Button><p>Join from a list of active lobbies.</p></div>
        </div>
    )
}

export default MainMenu;