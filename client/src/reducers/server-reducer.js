import { actions } from '../actions';
import { createLobby } from './server-reducer.helpers'

export default (state, action) => {

    switch (action.type) {
        case actions.createLobby:
            return createLobby(state, action);
        case actions.joinLobby:
            return { ...state }
        case actions.sendMessage:
            return { ...state }

        default:
            return { ...state }
    }
};