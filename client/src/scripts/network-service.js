import { serverActions, createLobbyAction, createPingAction } from './server-actions.js';
import {
    actions,
    getLobbies as getLobbiesClient,
    sendChatMessage as sendChatMessageClient,
    joinLobby as joinLobbyClient
} from '../actions';

export const connect = (url, onOpen, onMessage, onClose) => {
    let connection = new WebSocket(url);
    connection.onopen = onOpen;
    connection.onmessage = onMessage;
    connection.onclose = onClose;
    return connection;
};

export const processMessage = (event, dispatch, history) => {

    if (typeof (event) === 'undefined' || typeof (event.data) !== 'string') {
        return;
    }

    const action = JSON.parse(event.data);
    const { type, payload } = action;

    switch (type) {
        case serverActions.lobbyCreated:
            console.log('Server Communication: Lobby Created', payload);
            break;
        case serverActions.getLobbies:
            console.log('Server Communication: GetLobbies', payload);
            dispatch(getLobbiesClient(payload));
            break;
        case serverActions.ping:
            console.log('received ping', Date.now());
            dispatch(createPingAction({
                lastPingTime: Date.now()
            }));
            break;
        default:
            console.log('Server Communication: Unknown Message', type);
            break;
    }
}

export const createLobby = (connection, payload) => {
    const action = createLobbyAction(payload);
    connection.send(JSON.stringify(action));
}

export const getLobbies = (connection) => {
    if (connection && connection.readyState === 1) {
        connection.send(JSON.stringify({ type: actions.getLobbies }));
    }
};

export const leaveLobby = (connection, payload) => {
    if (connection && connection.readyState === 1) {
        connection.send(JSON.stringify({ type: actions.leaveLobby, payload }));
    }
}

export const sendChatMessage = (connection, payload) => {
    if (connection) {
        connection.send(JSON.stringify(sendChatMessageClient(payload)));
    }
};

//TODO: refactor as these are mostly the same
export const joinLobby = (connection, payload) => {
    if (connection && connection.readyState === 1) {
        connection.send(JSON.stringify(joinLobbyClient(payload)));
    }
}

export const ping = (connection) => {
    if (connection && connection.readyState === 1) {
        connection.send(JSON.stringify(createPingAction()));
    }
}
