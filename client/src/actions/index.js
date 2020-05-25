const actions = {
    newConnection: 'NEW_CONNECTION',
    connectionActive: 'CONNECTION_ACTIVE',
    createLobby: 'CREATE_LOBBY',
    joinLobby: 'JOIN_LOBBY',
    sendMessage: 'SEND_MESSAGE'
}

Object.freeze(actions);

const actionCreator = (type, payload) => { 
    return { type, payload }
 };

 export {actions};
 export const newConnection = payload => actionCreator(actions.newConnection, payload);
 export const connectionActive = payload => actionCreator(actions.connectionActive, payload);
 export const createLobby = payload => actionCreator(actions.createLobby, payload);
 export const joinLobby = payload => actionCreator(actions.joinLobby, payload);
 export const sendMessage = payload => actionCreator(actions.sendMessage, payload);
