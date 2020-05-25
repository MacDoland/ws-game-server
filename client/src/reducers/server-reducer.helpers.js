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

const newConnection = (state, action) => {
    const { connection } = action.payload;
    let newState = cloneState(state);
    newState.webSocketConnection = connection;

    return newState;
}

const connectionActive = (state, action) => {
    const { webSocketConnectionAlive } = action.payload;
    let newState = cloneState(state);
    newState.webSocketConnectionAlive = webSocketConnectionAlive;

    return newState;
}

const getLobbies = (state, action) => {
    const { lobbies  } = action.payload;
    let newState = cloneState(state);
    newState.lobbies= [...lobbies];

    return newState;
}

const joinLobby = (state, action) => {
    const { lobbyId } = action.payload;

    let newState = cloneState(state);
    newState.lobbyId = lobbyId;

    return newState;
}

const sendMessage = (state, action) => {
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

const updateUser = (state, action) => {
    const {id, name} = action.payload;

    let newState = cloneState(state);
    let index = newState.users.findIndex(user => user.id === id);

    if(index === -1) {
        newState.userId = id;
        newState.users.push({
            id,
            name
        });
    }
    else{
        newState.users[index] = {
            id, 
            name
        };
    }

    return newState;
}

export { newConnection, connectionActive, getLobbies, joinLobby, sendMessage, updateUser };