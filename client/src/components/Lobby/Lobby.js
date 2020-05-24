import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from '../Button';
import { Form, Field, TextInput } from '../Form';
import ChatWindow from '../ChatWindow';
import Panel from '../Panel';

import './Lobby.scss';

const Lobby = () => {

    const history = useHistory();
    const lobbyName = "Example Lobby 1";

    const defaultState = {
        currentMessage: '',
        messages: [
            {
                author: 'Joe',
                content: 'Hi this is an example of a chat message!',
                createdDate: new Date()
            },
            {
                author: 'George',
                content: 'I have received your example message!',
                createdDate: new Date()
            },
            {
                author: 'Lucy',
                content: 'I am also here in the channel!',
                createdDate: new Date()
            }
        ]
    }

    let [{ currentMessage, messages }, setState] = useState(defaultState);


    useEffect(() => {
        console.log('currentMessage: ', currentMessage);
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();

        if (isChatMessageValid()) {


            let messagesCopy = [...messages.map(message => Object.assign({}, message))];

            messagesCopy.push({
                author: 'Unknown',
                content: currentMessage.slice(),
                createdDate: new Date()
            });

            setState(Object.assign({}, {
                currentMessage: '',
                messages: messagesCopy
            }));
        }

    }

    const onChangeHandler = (event) => {
        let value = event.target.value;
        setState(Object.assign({}, {
            currentMessage: value,
            messages: [...messages.map(message => Object.assign({}, message))]
        }));
    }

    const isChatMessageValid = () => {
        return typeof (currentMessage) === 'string' && currentMessage !== '';
    }

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <Panel>
            <Form>

                <h2 className="h1">Lobby: {lobbyName} </h2>
                <Panel>
                    <ChatWindow messages={messages} />
                </Panel>
                <Field>
                    <TextInput id="chat-message" name="chat-message" value={currentMessage} onChange={onChangeHandler}></TextInput><Button onClick={sendMessage} disabled={!isChatMessageValid()}>Send</Button>
                </Field>


                <Button onClick={goBack}>Back</Button>
                <Button>Start Game</Button>
            </Form>
        </Panel>
    )
}

export default Lobby;