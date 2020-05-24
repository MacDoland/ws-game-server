export const createLobby = (state, action) => {
    const { username, lobbyName } = action.payload;

    let copyOfLobbies = [...state.lobbies.map(lobby => Object.assign({}, lobby))];
    copyOfLobbies.push({
        name: lobbyName
    });

    const newState = Object.assign({},
        state,
        {
            user: {
                name: username
            },
            lobbies: copyOfLobbies,
        });

    return newState;
}
