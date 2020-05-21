const WebSocket = require('ws')
const uuid = require('uuid');

const webSocketServer = new WebSocket.Server({ port: 8080 })

let lobby = [];

const commands = {
    REGISTER: "REGISTER",
    UNREGISTER: "UNREGISTER",
    NEWPLAYER: "NEWPLAYER"
}

const registerPlayer = (webSocket) => {
    console.log('registering player');

    let clientId = uuid.v1();
    response = {
        "ClientId": clientId,
        "Command": commands.REGISTER
    };

    lobby.push({
        clientId,
        webSocket
    });

    webSocket.send(JSON.stringify(response));
    notifyOtherClients({
        "ClientId": clientId,
        "Command": commands.NEWPLAYER
    });
    console.log('registering player - complete');
}

const unregisterPlayer = (id) => {
    console.log('unregistering player: ' + id);
    lobby = lobby.filter((player) => player.clientId != id);
}

const notifyOtherClients = (webSocket, message) => {
    webSocketServer.clients.forEach(function each(client) {
        if (client !== webSocket && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

const parseMessage = (message, webSocket) => {
    message = JSON.parse(message);

    switch (message.Command) {
        case commands.REGISTER:
            registerPlayer(webSocket);
            break;
        case commands.UNREGISTER:
            unregisterPlayer(message.ClientId);
            break;
        default:
            console.log(`Received message => ${message}`);
            break;
    }

    // webSocketServer.clients.forEach(function each(client) {
    //     if (client.readyState === WebSocket.OPEN) {
    //         client.send('message received: ' + message);
    //     }
    // });
}

webSocketServer.on('connection', (webSocket) => {
    webSocket.on('message', (message) => parseMessage(message, webSocket));
})