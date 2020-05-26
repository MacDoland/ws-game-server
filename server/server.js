const WebSocket = require("ws");
const uuid = require("uuid");
const commands = require("./modules/commands.js");
const url = require("url");

const port = process.env.PORT || 8080;
const webSocketServer = new WebSocket.Server({ port });

let lobby = [];
let lobbies = [];

const registerPlayer = (payload, webSocket) => {
  console.log("registering player");

  let clientId = uuid.v1();
  response = {
    clientId: clientId,
    command: commands.register,
  };

  if (payload) {
    lobby.push({
      clientId,
      webSocket,
      payload,
    });
  }

  webSocket.send(JSON.stringify(response));

  notifyOtherClients(webSocket, {
    clientId: clientId,
    command: commands.update,
    payload: lobby.map((item) => item.payload),
  });

  console.log("registering player - complete");
};

const removeUserFromAllLobbies = (userId) => {
    const lobbiesClone = [...lobbies.map((lobby) => Object.assign({}, lobby))];
}


const broadcast = (message) =>
  webSocketServer.clients.forEach((client) =>
    client.send(JSON.stringify(message))
  );

const notifyOtherClients = (webSocket, message) => {
  webSocketServer.clients.forEach(function each(client) {
    if (client !== webSocket && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

const createLobby = (payload, webSocket) => {
  console.log("payload", JSON.stringify(payload));
  const { lobbyId, lobbyName } = payload;

  if (lobbies.findIndex((lobby) => lobby.id === lobbyId) !== -1) {
    //TODO: SEND ERROR - LOBBY ALREADY EXISTS
    return;
  }

  const lobby = {
    hostId: webSocket.clientId,
    id: lobbyId,
    name: lobbyName,
    participants: [webSocket.clientId],
    messages: [],
  };

  console.log(JSON.stringify(lobby));

  lobbies.push(lobby);

  webSocket.send(
    JSON.stringify({
      type: commands.lobbyCreated,
      payload: lobby,
    })
  );

  broadcast({
    type: commands.getLobbies,
    payload: { lobbies },
  });
};

const addChatMessage = (payload) => {
  const { lobbyId, author, createdDate, content } = payload;

  const lobbiesClone = [...lobbies.map((lobby) => Object.assign({}, lobby))];
  const lobbyArrayIndex = lobbiesClone.findIndex(
    (lobby) => lobby.id === lobbyId
  );

  if (lobbyArrayIndex === -1) {
    //TODO: Error Handling
    return;
  }

  lobbiesClone[lobbyArrayIndex].messages.push({
    author,
    content,
    createdDate,
  });

  lobbies = lobbiesClone;

  broadcast({
    type: commands.getLobbies,
    payload: { lobbies },
  });
};

const joinLobby = (payload, webSocket) => {
  const { lobbyId, userId } = payload;

  const lobbiesClone = [...lobbies.map((lobby) => Object.assign({}, lobby))];
  const lobbyArrayIndex = lobbiesClone.findIndex(
    (lobby) => lobby.id === lobbyId
  );

  if (lobbyArrayIndex === -1) {
    //TODO: Error Handling
    return;
  }

  //Remove user from all lobbies
  lobbiesClone.map((lobby) => {
    return {
      ...lobby,
      participants: lobby.participants.filter((participant) => {
        participant.id !== userId;
      }),
    };
  });

  lobbiesClone[lobbyArrayIndex].participants.push(userId);

  lobbies = lobbiesClone;

  webSocket.send(
    JSON.stringify({
      type: commands.getLobbies,
      payload: { lobbies },
    })
  );
};

const parseMessage = (message, webSocket) => {
  //  console.log("message", JSON.stringify(message));

  message = JSON.parse(message);

  console.log(
    `action: ${message.type}, payload: ${JSON.stringify(message.payload)} `
  );
  switch (message.type) {
    case commands.register:
      //   registerPlayer(message.payload, webSocket);
      break;
    case commands.unregister:
      //    unregisterPlayer(message.ClientId);
      break;
    case commands.update:
      //    updateGameState(message, webSocket);
      break;
    case commands.createLobby:
      createLobby(message.payload, webSocket);
      break;
    case commands.getLobbies:
      webSocket.send(
        JSON.stringify({
          type: commands.getLobbies,
          payload: { lobbies },
        })
      );
      break;
    case commands.sendChatMessage:
      addChatMessage(message.payload, webSocket);
      break;
    case commands.joinLobby:
      joinLobby(message.payload, webSocket);
      break;
    default:
      console.log(`Received message => ${message}`);
      break;
  }
};

const noop = () => {};

const heartbeat = () => {
  this.isAlive = true;
};

const interval = setInterval(function ping() {
  webSocketServer.clients.forEach(function each(webSocket) {
    if (!webSocket.isAlive) {
      return webSocket.terminate();
    }

    webSocket.isAlive = false;
    webSocket.ping(noop);
  });
}, 30000);

webSocketServer.on("close", function close() {
  clearInterval(interval);
});

webSocketServer.on("connection", (webSocket, request) => {
  const query = url.parse(request.url, true).query;
  console.log("new connection", query.userId);
  webSocket.isAlive = true;
  webSocket.clientId = query.userId || uuid.v1();
  webSocket.on("message", (message) => parseMessage(message, webSocket));
  webSocket.on("pong", heartbeat);
});

console.log("Server listening on port:", port);
