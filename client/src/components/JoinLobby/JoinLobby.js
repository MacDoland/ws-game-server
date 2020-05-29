import React, { useState, useContext, useEffect } from 'react';
import { ServerContext } from '../../context/server-context';
import { updateUser } from '../../actions';
import { userSelector } from '../../selectors';
import { useHistory } from "react-router-dom";
import Button from '../Button';
import { Form, Field, TextInput } from '../Form';
import Panel from '../Panel';
import config from '../../config/app-config';

import './JoinLobby.scss';
import { getLobbies, joinLobby } from '../../scripts/network-service';

const JoinLobby = () => {
    const history = useHistory();
    const [state, dispatch] = useContext(ServerContext);
    const currentUser = userSelector(state) || { name: '' };
    const defaultState = { username: currentUser.name || '', lobbyId: state.lobbyId };
    const [{ username, lobbyId }, setState] = useState(defaultState);

    //Get the current lobbies once a service connection has been made
    useEffect(() => {
        if (state.webSocketConnectionAlive) {
            getLobbies(state.webSocketConnection);
        }
    }, [state.webSocketConnection, state.webSocketConnectionAlive])

    //Stash username in session storage once set
    useEffect(() => {
        if (username && username !== '') {
            sessionStorage.setItem(config.usernameSessionKey, username);
        }
    }, [username]);

    const goBackToHome = (event) => {
        event.preventDefault();
        history.replace('/');
    };

    const onLobbySelectionHandler = (lobbyId) => {
        setState({
            username,
            lobbyId
        });
    };

    const onUsernameChangeHandler = (event) => {
        setState({
            lobbyId,
            username: event.target.value
        });
    };

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
    };

    const displayLobbies = (lobbies) => {
        if (lobbies.length > 0) {
            return state.lobbies.map((lobby, index) =>
                <Button className={lobby.id === lobbyId ? 'button--selected' : ''} key={'lobbies-' + index} onClick={(event) => {
                    event.preventDefault();
                    onLobbySelectionHandler(lobby.id);
                }}>
                    <div>{lobby.name}</div>
                    <div>{lobby.participants.length}/20</div>
                    <div>open</div>
                </Button>
            );
        }
        else {
            return <p>There are currently no Lobbies to join... <Button onClick={() => { history.push('/host'); }}> Host a Lobby? </Button></p>
        }
    };


    return (
        <Panel className="join-lobby">
            <Form>
                <h2 className="h1">Join Lobby</h2>
                <Panel className="panel--no-padding join-lobby__select-lobby">
                    <h3 className="h2">Select a Lobby</h3>
                    <header className="join-lobby__select-lobby__header">
                        <div>Name</div>
                        <div>Players</div>
                        <div>Status</div>
                    </header>
                    <Field className="field--no-margin field--no-padding" isColumn={true}>
                        {
                            displayLobbies(state.lobbies || [])
                        }
                    </Field>
                </Panel>

                <Panel>
                    <h3 className="h2">Your Details</h3>
                    <Field>
                        <TextInput label={'Your Name'} id={'your-name'} name={'your-name'} value={username} onChange={onUsernameChangeHandler} />
                    </Field>
                </Panel>
                <Button onClick={goBackToHome}>Back</Button>
                <Button onClick={onJoinLobby} disabled={typeof (username) !== 'string' || username === ''}>Join</Button>
            </Form>
        </Panel>
    )
};

export default JoinLobby;