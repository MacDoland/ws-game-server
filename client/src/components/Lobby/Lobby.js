import React, { useState, useContext, useEffect } from 'react';
import { ServerContext } from '../../context/server-context';
import { lobbySelector } from '../../selectors';
import { useHistory } from "react-router-dom";
import { userSelector, currentLobbySelector } from '../../selectors';
import Button from '../Button';
import { Form, Field, TextInput } from '../Form';
import ChatWindow from '../ChatWindow';
import LobbyUserList from '../LobbyUserList';
import Panel from '../Panel';
import { sendChatMessage, getLobbies } from '../../scripts/network-service';

import './Lobby.scss';

const Lobby = () => {

    const history = useHistory();
    const [state] = useContext(ServerContext);
    const [currentMessage, setCurrentMessage] = useState('');
    const currentUser = userSelector(state) || { name: '' };
    let selectedLobbies = currentLobbySelector(state);

    let lobby = selectedLobbies.length > 0 ? selectedLobbies[0] : {
        name: '',
        messages: []
    }

    useEffect(() => {
        getLobbies(state.webSocketConnection);
    }, [state.webSocketConnectionAlive])

    //If the lobbyId is missing, we don't know which lobby to show so redirect to home
    useEffect(() => {
        // if (currentLobbySelector(state).length === 0) {
        //     history.replace('/');
        // }

        let selectedLobbies = currentLobbySelector(state);

        let lobby = selectedLobbies.length > 0 ? selectedLobbies[0] : {
            name: '',
            messages: []
        }

    }, [state.lobbies]);




    const onSendMessage = (event) => {
        event.preventDefault();

        sendChatMessage(state.webSocketConnection, {
            lobbyId: lobby.id,
            author: currentUser.name,
            content: currentMessage,
            createdDate: new Date()
        });
    }

    const onChangeHandler = (event) => {
        setCurrentMessage(event.target.value);
    }

    const isChatMessageValid = () => {
        return typeof (currentMessage) === 'string' && currentMessage !== '';
    }

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }

    const { name, messages } = lobby;

    return (
        <Panel className="lobby">
            <Form>
                <h2 className="h1">Lobby: <span className="lobby__name">{name}</span> </h2>
                <div className="lobby__body">
                    <Panel>
                        <ChatWindow messages={messages} />
                    </Panel>

                    <Panel>
                        <LobbyUserList users={state.users} />
                    </Panel>
                </div>
                <Field className="lobby__chat-bar">
                    <TextInput id="chat-message" name="chat-message" value={currentMessage} onChange={onChangeHandler}></TextInput><Button onClick={onSendMessage} disabled={!isChatMessageValid()}>Send</Button>
                </Field>

                <Button onClick={goBack}>Back</Button>
                <Button>Start Game</Button>
            </Form>
        </Panel>
    )
}

export default Lobby;