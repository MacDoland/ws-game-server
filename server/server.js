const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const parseMessage = (message) => {
    

    switch(message) {
        case 'example':
            console.log(`Received example message => ${message}`);
            break;
        default:
            console.log(`Received message => ${message}`);
            break;
    }

}

wss.on('connection', (ws) => {
  ws.on('message', parseMessage)
  ws.send('ho!')
})