const WebSocket = require('ws')
const uuid = require('uuid');
const commands = require('./modules/commands.js');

const webSocketServer = new WebSocket.Server({ port: 8080 })

let lobby = [];

const registerPlayer = (payload, webSocket) => {
    console.log('registering player');

    let clientId = uuid.v1();
    response = {
        "clientId": clientId,
        "command": commands.REGISTER
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
        "command": commands.UPDATE,
        "payload": lobby.map(item => item.payload)
    });

    console.log('registering player - complete');
}

const unregisterPlayer = (id) => {
    console.log('unregistering player: ' + id);
    lobby = lobby.filter((player) => player.clientId != id);
}

const notifyOtherClients = (webSocket, message) => {
   // console.log('sending message: ', message);
    webSocketServer.clients.forEach(function each(client) {

        if (client !== webSocket && client.readyState === WebSocket.OPEN) {
            //console.log('sending notification', JSON.stringify(message));
            client.send(JSON.stringify(message));
        }
    });
};

const parseMessage = (message, webSocket) => {
    message = JSON.parse(message);

    switch (message.command) {
        case commands.REGISTER:
            registerPlayer(message.payload, webSocket);
            break;
        case commands.UNREGISTER:
            unregisterPlayer(message.ClientId);
            break;
        case commands.UPDATE:
            updateGameState(message, webSocket);
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

webSocketServer.on('connection', (webSocket) => {
    console.log('new connection');
    webSocket.on('message', (message) => parseMessage(message, webSocket));
})