import commands from './modules/commands.js';
import Observable from './observable.js';

class NetworkManager {

  constructor() {
    this.clientId = new Observable();
    this.gameData = new Observable();
  }

  connect(url, ) {
    let promise = new Promise((resolve, reject) => {
      this.connection = new WebSocket(url);

      this.connection.onopen = () => {
        resolve();
      };

      this.connection.onmessage = (e) => {
        console.log(e);
        if (typeof (e.data) === 'string') {
          this.parseMessage(e.data);
        }
      };
    });

    return promise;
  }

  register(player) {
    let message = JSON.stringify({
      command: commands.REGISTER,
      payload: player
    });

    this.connection.send(message)
  }

  parseMessage(message) {
    message = JSON.parse(message);

    switch (message.command) {
      case commands.REGISTER:
        this.clientId.setState({
          clientId: message.clientId
        });
        break;
      case commands.UPDATE:
        this.gameData.setState({gameObjects: message.payload});
        break;
      default:
        console.log('parseMessage default case: ', message);
        break;
    }
  }

  update(payload) {
    let message = JSON.stringify({
      clientId: this.clientId.getState().clientId,
      command: commands.UPDATE,
      payload: payload
    });

    this.connection.send(message)
  }

  subscribeToRegister(observer) {
    this.clientId.subscribe(observer);
  }

  subscribeToGameData(observer) {
    this.gameData.subscribe(observer);
  }

}

export default NetworkManager;


      // const exampleMessage = {
      //   message: "example",
      //   payload: {
      //     name: "joe",
      //   },
      // };
      // const serialisedMessage = JSON.stringify(exampleMessage);
      // const encodedMessage = atob(serialisedMessage);

      // connection.send(encodedMessage);