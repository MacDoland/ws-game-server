import { actions } from '../actions';
import { newConnection, connectionActive, getLobbies, joinLobby, ping, sendMessage, updateUser } from './server-reducer.helpers'

export default (state, action) => {
    switch (action.type) {
        case actions.newConnection:
            return newConnection(state, action);
        case actions.connectionActive:
            return connectionActive(state, action);
        case actions.getLobbies:
            return getLobbies(state, action);
        case actions.joinLobby:
            return joinLobby(state, action);
        case actions.sendMessage:
            return sendMessage(state, action);
        case actions.updateUser:
            return updateUser(state, action);
        case actions.ping:
            return ping(state, action);
        default:
            return { ...state }
    }
};