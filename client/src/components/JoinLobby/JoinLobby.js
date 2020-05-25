import React, { useState, useContext, useEffect } from 'react';
import { ServerContext } from '../../context/server-context';
import {  updateUser } from '../../actions';
import { userSelector } from '../../selectors';
import { useHistory } from "react-router-dom";
import Button from '../Button';
import { Form, Field, TextInput, RadioInput } from '../Form';
import Panel from '../Panel';

import './JoinLobby.scss';
import { getLobbies, joinLobby } from '../../scripts/network-service';

const JoinLobby = () => {
    const history = useHistory();
    const [state, dispatch] = useContext(ServerContext);
    const currentUser = userSelector(state) || { name: '' };
    const defaultState = { username: currentUser.name, lobbyId: state.lobbyId };
    const [{ username, lobbyId }, setState] = useState(defaultState);


    useEffect(() => {
        getLobbies(state.webSocketConnection);
    }, [state.webSocketConnectionAlive])

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }

    const onLobbySelectionHandler = (event) => {
        const lobbyId = event.target.value;

        setState(Object.assign({}, {
            username,
            lobbyId
        }))
    }

    const onUsernameChangeHandler = (event) => {
        setState(Object.assign({}, {
            username: event.target.value,
            lobbyId
        }))
    }

    const onJoinLobby = (event) => {
        event.preventDefault();

        dispatch(updateUser({ 
            id: state.userId,
            name: username
        }));

        joinLobby(state.webSocketConnection, {
            lobbyId,
            userId: state.userId
        });
        
        history.push('/lobby');
    }


    return (
        <Panel>
            <Form>

                <h2 className="h1">Join Lobby</h2>
                <Panel>
                    <h3 className="h2">Select a Lobby</h3>
                    <Field isColumn={true}>
                        {
                            state.lobbies.map((lobby, index) => <RadioInput key={'lobbies-' + index} id={'lobbies-' + index} label={lobby.name} value={lobby.id} name={'lobby'} onChange={onLobbySelectionHandler} checked={lobbyId === lobby.id} />)
                        }
                    </Field>
                </Panel>

                <Panel>
                    <h3 className="h2">Your Details</h3>
                    <Field>
                        <TextInput label={'Your Name'} id={'your-name'} name={'your-name'} value={username} onChange={onUsernameChangeHandler} />
                    </Field>
                </Panel>
                <Button onClick={goBack}>Back</Button>
                <Button onClick={onJoinLobby} disabled={typeof(username) !== 'string' || username === ''}>Join</Button>
            </Form>
        </Panel>
    )
}

export default JoinLobby;