import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { ConnectionContext } from '../../context/connection-context';
import { ServerContext } from '../../context/server-context';
import { userSelector } from '../../selectors';
import config from '../../config/app-config';

import Button from '../Button';
import { Form, Field, TextInput } from '../Form';
import Panel from '../Panel';

import { createLobbyEffect, storeUsernameEffect } from '../../effects';

import './HostLobby.scss';

const HostLobby = () => {
    const history = useHistory();
    const connection = useContext(ConnectionContext);
    const [state] = useContext(ServerContext);
    const currentUser = userSelector(state) || { name: '' };
    const defaultState = { username: currentUser.name || '', lobbyName: '', lobbyCreated: false, lobbyId: state.lobbyId };
    const [{ username, lobbyName, lobbyCreated: shouldSubmitLobby }, setState] = useState(defaultState);

    useEffect(() => {
        if (shouldSubmitLobby && state.webSocketConnectionAlive) {
            createLobbyEffect(connection.current, lobbyName);
            history.push('/lobby');
        }
    }, [lobbyName, connection.current, state.webSocketConnectionAlive, shouldSubmitLobby]);

    //Stash username in session storage once set
    useEffect(() => {
        storeUsernameEffect(username);
    }, [username])

    const goBack = (event) => {
        event.preventDefault();
        history.replace('/');
    }

    const lobbyOnChange = (event) => {
        setState({
            username,
            lobbyName: event.target.value,
        });
    }

    const usernameOnChange = (event) => {
        setState({
            username: event.target.value,
            lobbyName,
        });
    }

    const inputIsValid = (username, lobbyName) => {
        //TODO: Check valid characters
        let usernameValid = typeof (username) !== 'undefined' && username !== '';
        let lobbyNameValid = typeof (lobbyName) !== 'undefined' && lobbyName !== '';

        return usernameValid && lobbyNameValid;
    }

    const onCreateLobbyHandler = (event) => {
        event.preventDefault();

        if (inputIsValid(username, lobbyName)) {
            setState({
                username,
                lobbyName,
                lobbyCreated: true
            });
        }
    }

    return (
        <Panel>
            <Form>
                <Field>
                    <TextInput label={'Lobby Name'} id={'lobby-name'} name={'lobby-name'} value={lobbyName} onChange={lobbyOnChange} />
                </Field>

                <Field>
                    <TextInput label={'Your Name'} id={'your-name'} name={'your-name'} value={username} onChange={usernameOnChange} />
                </Field>

                <Button onClick={goBack}>Back</Button>
                <Button onClick={onCreateLobbyHandler} disabled={typeof (username) !== 'string' || username === ''}>Create</Button>
            </Form>
        </Panel>
    )
}

export default HostLobby;