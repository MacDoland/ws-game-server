const cloneDeep = require('lodash/cloneDeep');
const commands = require('../modules/commands.js');
const config = require('../config');
const logger = require('../logger');
const sendLogger = logger(config.consoleColours.cyan);

const addChatMessage = (state, lobbyId, author, createdDate, content) => {
  const newState = cloneDeep(state);

  const lobbyArrayIndex = newState.lobbies.findIndex(
    (lobby) => lobby.id === lobbyId
  );

  if (lobbyArrayIndex === -1) {
    //TODO: Error Handling
    return state;
  }

  newState.lobbies[lobbyArrayIndex].messages.push({
    author,
    content,
    createdDate,
  });

  return newState;
};


const broadcast = (server, message) => server.clients.forEach((client) => send(client, message));

const broadcastLobbies = (server, lobbies) => broadcast(server, {
  type: commands.getLobbies,
  payload: { lobbies },
});

const createLobby = (state, lobbyId, lobbyName, userId) => {
  let newState = cloneDeep(state);

  if (state.lobbies.findIndex((lobby) => lobby.id === lobbyId) !== -1) {
    //TODO: SEND ERROR - LOBBY ALREADY EXISTS
    return state;
  }

  const lobby = {
    hostId: userId,
    id: lobbyId,
    name: lobbyName,
    participants: [userId],
    messages: [],
  };

  newState.lobbies.push(lobby);

  return newState;
};

const joinLobby = (state, lobbyId, userId) => {
  const newState = cloneDeep(state);
  const lobbyArrayIndex = newState.lobbies.findIndex(
    (lobby) => lobby.id === lobbyId
  );

  if (lobbyArrayIndex === -1) {
    //TODO: Error Handling
    return state;
  }

  //Remove user from all lobbies
  newState.lobbies.map((lobby) => {
    return {
      ...lobby,
      participants: lobby.participants.filter((participant) => {
        participant.id !== userId;
      }),
    };
  });

  newState.lobbies[lobbyArrayIndex].participants.push(userId);

  return newState;
};

const removeUserFromAllLobbies = (state, userId) => {
  const newState = cloneDeep(state);
  newState.lobbies = newState.lobbies.map((lobby) => {
    lobby.participants = lobby.participants.filter(participant => participant !== userId);
    return lobby;
  });

  return newState;
}

const send = (client, message) => {
  const stringifiedMessage = JSON.stringify(message);
  sendLogger.log('Sending message:', ' client:', client.clientId, stringifiedMessage);
  client.send(stringifiedMessage);
}

module.exports = {
  addChatMessage,
  broadcast,
  broadcastLobbies,
  createLobby,
  joinLobby,
  removeUserFromAllLobbies,
  send
};