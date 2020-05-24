import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";

import { ServerContext } from '../../context/server-context';
import { createLobby } from '../../actions';


import Button from '../Button';
import { Form, Field, TextInput } from '../Form';
import Panel from '../Panel';

import './HostLobby.scss';

const HostLobby = () => {
    const history = useHistory();
    const [state, dispatch] = useContext(ServerContext);
    const defaultState = { username: state.user.name.slice(), lobbyName: '' };
    const [{ username, lobbyName }, setState] = useState(defaultState);

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
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

    const onCreateLobbyHandler = (event) => {
        event.preventDefault();

        dispatch(createLobby({
            username,
            lobbyName
        }));

        history.push('/lobby')
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
                <Button onClick={onCreateLobbyHandler}>Create</Button>
            </Form>
        </Panel>
    )
}

export default HostLobby;