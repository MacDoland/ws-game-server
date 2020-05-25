const serverActions = {
    createLobby: 'CREATE_LOBBY',
    lobbyCreated: 'LOBBY_CREATED',
    getLobbies: 'GET_LOBBIES'
};

Object.freeze(serverActions);

const actionCreator = (type, payload) => { 
    return { type, payload }
 };

export { serverActions };
export const createLobbyAction = payload => actionCreator(serverActions.createLobby, payload);