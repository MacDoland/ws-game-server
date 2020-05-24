import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '../Button';
import { Form, Field, TextInput, RadioInput } from '../Form';
import Panel from '../Panel';

import './JoinLobby.scss';

const JoinLobby = () => {
    const history = useHistory();
    const lobbies = [
        {
            name: 'Example Lobby 1'
        },
        {
            name: 'Example Lobby 2'
        },
        {
            name: 'Example Lobby 3'
        }
    ]

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <Panel>
            <Form>

                <h2 className="h1">Join Lobby</h2>
                <Panel>
                    <h3 className="h2">Select a Lobby</h3>
                    <Field isColumn={true}>
                        {
                            lobbies.map((lobby, index) => <RadioInput key={'lobbies-' + index} id={'lobbies-' + index} label={lobby.name} name={'lobby'} />)
                        }
                    </Field>
                </Panel>

                <Panel>
                    <h3 className="h2">Your Details</h3>
                    <Field>
                        <TextInput label={'Your Name'} id={'your-name'} name={'your-name'} />
                    </Field>
                </Panel>
                <Button onClick={goBack}>Back</Button>
                <Button>Join</Button>
            </Form>
        </Panel>
    )
}

export default JoinLobby;