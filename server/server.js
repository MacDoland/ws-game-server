const WebSocket = require("ws");
const uuid = require("uuid");
const commands = require("./modules/commands.js");
const url = require("url");
const config = require('./config');
const logger = require('./logger');
const recieveLogger = logger(config.consoleColours.green);
const connectionLogger = logger(config.consoleColours.red);
const sendLogger = logger(config.consoleColours.cyan);

const { addChatMessage, broadcastLobbies, createLobby, joinLobby, removeUserFromAllLobbies, send } = require("./functions/server-functions");

const port = process.env.PORT || 8080;
const webSocketServer = new WebSocket.Server({ port });
let state = { lobbies: [] }

const parseMessage = (message, webSocket) => {
  message = JSON.parse(message);

  recieveLogger.log('Received message:', `action: ${message.type}, payload: ${JSON.stringify(message.payload)}`);

  switch (message.type) {
    case commands.createLobby:
      const lobbyId = uuid.v1();
      state = removeUserFromAllLobbies(state, message.payload.userId);
      state = createLobby(state, lobbyId, message.payload.lobbyName, message.payload.userId);
      broadcastLobbies(webSocketServer, state.lobbies);
      send(webSocket, {
        type: commands.lobbyCreated,
        payload: {
          lobbyId
        }
      });
      break;
    case commands.getLobbies:
      send(webSocket,
        {
          type: commands.getLobbies,
          payload: { lobbies: state.lobbies },
        }
      );
      break;
    case commands.sendChatMessage:
      state = addChatMessage(message.payload, webSocket);
      broadcastLobbies(webSocketServer, state.lobbies);
      break;
    case commands.joinLobby:
      state = joinLobby(state, message.payload.lobbyId, message.payload.lobbyId);
      broadcastLobbies(webSocketServer, state.lobbies);
      break;
    case commands.leaveLobby:
      state = removeUserFromAllLobbies(state, message.payload.userId);
      broadcastLobbies(webSocketServer, state.lobbies);
      break;
    case commands.pong:
      webSocket.isAlive = true;
      break;
    default:
      recieveLogger.log('Received message => ',message);
      break;
  }
};

const interval = setInterval(function ping() {
  webSocketServer.clients.forEach(function each(webSocket) {
    if (!webSocket.isAlive) {
      return webSocket.terminate();
    }

    webSocket.isAlive = false;
    send(webSocket, {
      type: 'PING'
    })
  });
}, 10000);

webSocketServer.on("close", function close() {
  clearInterval(interval);
});

webSocketServer.on("connection", (webSocket, request) => {
  const query = url.parse(request.url, true).query;
  connectionLogger.log('new connection', query.userId);
  webSocket.isAlive = true;
  webSocket.clientId = query.userId || uuid.v1();
  webSocket.on("message", (message) => parseMessage(message, webSocket));
});

connectionLogger.log('Server listening on port:', port);
