import React, { useState, useContext, useEffe, useEffect } from 'react';
import { ServerContext } from '../../context/server-context';
import { lobbySelector } from '../../selectors';
import { sendMessage } from '../../actions';
import { useHistory } from "react-router-dom";
import { userSelector } from '../../selectors';
import Button from '../Button';
import { Form, Field, TextInput } from '../Form';
import ChatWindow from '../ChatWindow';
import LobbyUserList from '../LobbyUserList';
import Panel from '../Panel';

import './Lobby.scss';

const Lobby = () => {

    const history = useHistory();
    const [state, dispatch] = useContext(ServerContext);
    const [currentMessage, setCurrentMessage] = useState('');
    const currentUser = userSelector(state) || { name: '' };

    //If the lobbyId is missing, we don't know which lobby to show so redirect to home
    useEffect(() => {
        if(typeof(state.lobbyId) !== 'string' || state.lobbyId === ''){
            history.replace('/');
        }
    }, state.lobbyId)

    const onSendMessage = (event) => {
        event.preventDefault();

        dispatch(sendMessage({
            lobbyId: state.lobbyId.slice(),
            author: currentUser.name.slice(),
            content: currentMessage.slice(),
            createdDate: new Date()
        }));
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

    const { name, messages } = lobbySelector(state);

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