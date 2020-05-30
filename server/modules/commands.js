const commands = {
    register: "REGISTER",
    unregister: "UNREGISTER",
    newPlayer: "NEWPLAYER",
    update: "UPDATE",
    createLobby: "CREATE_LOBBY",
    lobbyCreated: "LOBBY_CREATED",
    getLobbies: "GET_LOBBIES",
    sendChatMessage: 'SEND_CHAT_MESSAGE',
    lobbiesUpdated: 'LOBBIES_UPDATED',
    joinLobby: 'JOIN_LOBBY',
    leaveLobby: 'LEAVE_LOBBY',
    pong: 'PONG'
}

Object.freeze(commands);

module.exports = commands;