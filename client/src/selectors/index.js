export const lobbySelector = (state) => {
    let lobby = {};

    let lobbyIndex = state.lobbies.findIndex(lobby => lobby.id === state.lobbyId);

    if(lobbyIndex >= 0){
        lobby = Object.assign({}, state.lobbies[lobbyIndex]);
    }

    return lobby;
}

export const userSelector = (state) => {
    let user = { name: '' };

    if (typeof (state.userId) === 'string' || state.userId !== '') {
        let index = state.users.findIndex(user => user.id === state.usedId);

        if (index >= 0) {
           user = state.users[index];
        }
    }

    return user;
}