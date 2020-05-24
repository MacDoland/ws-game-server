import { v1 as uuidv1 } from 'uuid';

const cloneState = (state) => {
    return Object.assign({}, state, {
        lobbies: [...state.lobbies.map(lobby => Object.assign({}, {
            ...lobby,
            messages: [...lobby.messages.map(message => Object.assign({}, message))]
        }))],
        users: [...state.users.map(user => Object.assign({}, user))]
    })
}

const updateUser = (state, action) => {
    const { username } = action.payload;

    if (typeof (state.userId) !== 'string' || state.userId === '') {
        const usedId = uuidv1();
        state.users.push({
            id: usedId,
            name: username
        });

        state.usedId = usedId;
    }
    else {
        let index = state.users.findIndex(user => user.id === state.usedId);

        if (index >= 0) {
            state.users[index].name = username;
        }
    }

    return state;
}

export const createLobby = (state, action) => {
    const { lobbyName } = action.payload;
    const lobbyId = uuidv1();
    let newState = cloneState(state);


    newState = updateUser(newState, action);
    newState.lobbyId = lobbyId;

    newState.lobbies.push({
        id: lobbyId,
        name: lobbyName,
        messages: [],
        hostId: newState.usedId
    });

    return newState;
};

export const joinLobby = (state, action) => {
    const { lobbyId } = action.payload;

    let newState = cloneState(state);

    newState = updateUser(newState, action);
    newState.lobbyId = lobbyId;

    return newState;
}

export const sendMessage = (state, action) => {
    const { lobbyId, author, content, createdDate } = action.payload;

    let newState = cloneState(state);
    let index = newState.lobbies.findIndex(lobby => lobby.id === lobbyId);

    if (index >= 0) {
        newState.lobbies[index].messages.push({
            author,
            content,
            createdDate
        });

        return newState;
    }
    else {
        return state;
    }
}