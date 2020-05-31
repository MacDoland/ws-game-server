import React, { useState, useContext, useEffect } from 'react';
import { ConnectionContext } from '../../context/connection-context';
import { ServerContext } from '../../context/server-context';
import { useHistory } from "react-router-dom";
import { userSelector, currentLobbySelector, currentParticipantsSelector } from '../../selectors';
import Button from '../Button';
import { Form, Field, TextInput } from '../Form';
import ChatWindow from '../ChatWindow';
import LobbyUserList from '../LobbyUserList';
import Panel from '../Panel';
import { sendChatMessage, getLobbies, leaveLobby } from '../../scripts/network-service';

import './Lobby.scss';

const Lobby = () => {

    const history = useHistory();
    const connection = useContext(ConnectionContext);
    const [state] = useContext(ServerContext);
    const initialState = { currentMessage: '' };
    const [{ currentMessage }, setState] = useState(initialState);
    const currentUser = userSelector(state);

    console.log('currentUser', currentUser);

    let selectedLobby = currentLobbySelector(state);

    let lobby = selectedLobby || {
        name: '',
        messages: []
    }

    useEffect(() => {
        if (state.webSocketConnectionAlive) {
            getLobbies(connection.current);
        }
    }, [connection.current, state.webSocketConnectionAlive])

    const onSendMessage = (event) => {
        event.preventDefault();

        sendChatMessage(connection.current, {
            lobbyId: lobby.id,
            author: currentUser.name,
            content: currentMessage,
            createdDate: new Date()
        });
    }

    const onChangeHandler = (event) => {
        setState(Object.assign({}, {
            currentMessage: event.target.value
        }));
    }

    const isChatMessageValid = () => {
        return typeof (currentMessage) === 'string' && currentMessage !== '';
    }

    const goBack = (event) => {
        event.preventDefault();

        leaveLobby(connection.current, {
            userId: state.userId
        });

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
                        <LobbyUserList users={currentParticipantsSelector(state)} />
                    </Panel>
                </div>
                <Field className="lobby__chat-bar">
                    <TextInput id="chat-message" name="chat-message" value={currentMessage} onChange={onChangeHandler}></TextInput>
                    <Button onClick={onSendMessage} disabled={!isChatMessageValid()}>Send</Button>
                </Field>

                <Button onClick={goBack}>Back</Button>
                <Button>Start Game</Button>
            </Form>
        </Panel>
    )
}

export default Lobby;