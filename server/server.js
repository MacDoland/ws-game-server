const WebSocket = require('ws')
const uuid = require('uuid');
const commands = require('./modules/commands.js');

const port = process.env.PORT || 8080;
const webSocketServer = new WebSocket.Server({ port })


let lobby = [];
let lobbies = [];

const registerPlayer = (payload, webSocket) => {
    console.log('registering player');

    let clientId = uuid.v1();
    response = {
        "clientId": clientId,
        "command": commands.register
    };

    if (payload) {
        lobby.push({
            clientId,
            webSocket,
            payload
        });
    }

    webSocket.send(JSON.stringify(response));

    notifyOtherClients(webSocket, {
        "clientId": clientId,
        "command": commands.update,
        "payload": lobby.map(item => item.payload)
    });

    console.log('registering player - complete');
}

const unregisterPlayer = (id) => {
    console.log('unregistering player: ' + id);
    lobby = lobby.filter((player) => player.clientId != id);
}

const broadcast = message => webSocketServer.clients.forEach((client) => client.send(JSON.stringify(message)));

const notifyOtherClients = (webSocket, message) => {
    webSocketServer.clients.forEach(function each(client) {

        if (client !== webSocket && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

const createLobby = (payload, webSocket) => {
    console.log('payload', JSON.stringify(payload));
    const { lobbyId, lobbyName } = payload;

    if (lobbies.findIndex(lobby => lobby.id === lobbyId) !== -1) {
        //TODO: SEND ERROR - LOBBY ALREADY EXISTS
        return;
    }

    const lobby = {
        hostId: webSocket.clientId,
        id: lobbyId,
        name: lobbyName,
        participants: [
            webSocket.id
        ],
        messages: []
    }

    console.log(JSON.stringify(lobby));

    lobbies.push(lobby);

    webSocket.send(JSON.stringify({
        "type": commands.lobbyCreated,
        "payload": lobby
    }));
};

const parseMessage = (message, webSocket) => {

    //  console.log("message", JSON.stringify(message));

    message = JSON.parse(message);

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
            console.log(`Client Action: ${message.type}, payload: ${JSON.stringify(message.payload)} `);
            createLobby(message.payload, webSocket);
            break;
        default:
            console.log(`Received message => ${message}`);
            break;
    }
}

const updateGameState = ({ clientId, command, payload }, webSocket) => {
    let playerDataIndex = lobby.findIndex(item => item.clientId === clientId);
    // console.log("update", playerDataIndex, lobby);


    if (playerDataIndex !== -1) {
        // let gameData = JSON.parse(JSON.stringify(lobby));

        lobby[playerDataIndex] = {
            "clientId": lobby[playerDataIndex].clientId,
            "webSocket": lobby[playerDataIndex].webSocket,
            "payload": payload
        };

        //lobby = [...gameData];

        notifyOtherClients(webSocket, {
            command,
            "payload": lobby.map(item => item.payload)
        });
    }
}

const noop = () => { }

const heartbeat = () => {
    this.isAlive = true;
}

const interval = setInterval(function ping() {
    webSocketServer.clients.forEach(function each(webSocket) {
        if (!webSocket.isAlive) {
            return webSocket.terminate();
        }

        webSocket.isAlive = false;
        webSocket.ping(noop);
    });
}, 30000);

webSocketServer.on('close', function close() {
    clearInterval(interval);
});

webSocketServer.on('connection', (webSocket) => {
    console.log('new connection');
    webSocket.isAlive = true;
    webSocket.clientId = uuid.v1();
    webSocket.on('message', (message) => parseMessage(message, webSocket));
    webSocket.on('pong', heartbeat);
});

console.log('Server listening on port:', port)