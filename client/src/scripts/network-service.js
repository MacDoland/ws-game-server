import { serverActions, createLobbyAction } from './server-actions.js';
import {
    actions,
    getLobbies as getLobbiesClient,
    sendChatMessage as sendChatMessageClient,
    joinLobby as joinLobbyClient
} from '../actions';

export const connect = (url) => {
    return new WebSocket(url);
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
            //Don't like this, can we move history to somewhere else?
            //history.push('/lobby');
            console.log('history', history);
            break;
        case serverActions.getLobbies:
            console.log('Server Communication: GetLobbies', payload);
            dispatch(getLobbiesClient(payload));
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
    if(connection) {
        connection.send(JSON.stringify(joinLobbyClient(payload)));
    }
}
