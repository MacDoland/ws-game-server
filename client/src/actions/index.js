const actions = {
    newConnection: 'NEW_CONNECTION',
    connectionActive: 'CONNECTION_ACTIVE',
    createLobby: 'CREATE_LOBBY',
    getLobbies: 'GET_LOBBIES',
    joinLobby: 'JOIN_LOBBY',
    sendChatMessage: 'SEND_CHAT_MESSAGE',
    lobbiesUpdated: 'LOBBIES_UPDATED',
    updateUser: 'UPDATE_USER',
    leaveLobby: 'LEAVE_LOBBY'
}

Object.freeze(actions);

const actionCreator = (type, payload) => { 
    return { type, payload }
 };

 export {actions};
 export const newConnection = payload => actionCreator(actions.newConnection, payload);
 export const connectionActive = payload => actionCreator(actions.connectionActive, payload);
 export const createLobby = payload => actionCreator(actions.createLobby, payload);
 export const getLobbies = payload => actionCreator(actions.getLobbies, payload);
 export const joinLobby = payload => actionCreator(actions.joinLobby, payload);
 export const sendMessage = payload => actionCreator(actions.sendMessage, payload);
 export const sendChatMessage = payload => actionCreator(actions.sendChatMessage, payload);
 export const updateUser = payload => actionCreator(actions.updateUser, payload);
 export const leaveLobby = payload => actionCreator(actions.leaveLobby, payload);
