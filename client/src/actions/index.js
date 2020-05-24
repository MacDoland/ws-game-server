const actions = {
    createLobby: 'CREATE_LOBBY',
    joinLobby: 'JOIN_LOBBY',
    sendMessage: 'SEND_MESSAGE'
}

Object.freeze(actions);

const actionCreator = (type, payload) => { 
    return { type, payload }
 };
const createLobby = payload => actionCreator(actions.createLobby, payload);
const joinLobby = payload => actionCreator(actions.joinLobby, payload);
const sendMessage = payload => actionCreator(actions.sendMessage, payload);

export { actions, createLobby, joinLobby, sendMessage };