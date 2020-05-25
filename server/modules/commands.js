const commands = {
    register: "REGISTER",
    unregister: "UNREGISTER",
    newPlayer: "NEWPLAYER",
    update: "UPDATE",
    createLobby: "CREATE_LOBBY",
    lobbyCreated: "LOBBY_CREATED"
}

Object.freeze(commands);

module.exports = commands;