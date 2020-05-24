import { actions } from '../actions';
import { createLobby, joinLobby, sendMessage } from './server-reducer.helpers'

export default (state, action) => {

    switch (action.type) {
        case actions.createLobby:
            return createLobby(state, action);
        case actions.joinLobby:
            return joinLobby(state, action);
        case actions.sendMessage:
            return sendMessage(state, action);

        default:
            return { ...state }
    }
};