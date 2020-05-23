import Player from './player.js';
import NetworkManager from './network-manager.js';
import commands from './modules/commands.js';
import Observer from './observer.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        this.time = new Date();
        this.currentTime = new Date();
        this.deltaTime = 0;
        this.gameObjects = [];
        this.player = new Player('player-1', { x: 200, y: 200 })
        this.gameObjects.push(this.player);

        let gameDataObserver = new Observer();
        gameDataObserver.notify = ((state) => {
           // console.log("new game data ", state);

            this.gameObjects = [...state.gameObjects];
        });

        let registrationObserver = new Observer();
        registrationObserver.notify = ((state) => {
            this.clientId = state.clientId;
            this.render(this.gameObjects, this.canvas, this.context);
        }).bind(this);

        const url = "ws://localhost:8080";
        this.networkManager = new NetworkManager();
        this.networkManager.connect(url).then(() => {
                setTimeout(() => { this.networkManager.register(this.player.get()); });
            }
        );
        this.networkManager.subscribeToRegister(registrationObserver);
        this.networkManager.subscribeToGameData(gameDataObserver);


    }


    notify(state) {

        this.clientId = state.clientId;



    }

    draw(context, gameObject) {
        context.beginPath();
        context.arc(gameObject.position.x, gameObject.position.y, 10, 0, 2 * Math.PI, false);
        context.fillStyle = gameObject.color;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#003300';
        context.stroke();
    }

    render() {
        this.networkManager.update(this.player.get());
        this.currentTime = new Date();
        this.deltaTime = this.currentTime - this.time;
        this.time = this.currentTime;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.player.update(this.deltaTime / 1000);
     //   this.gameObjects.forEach(updateable => updateable.update(this.deltaTime / 1000));
        this.gameObjects.forEach(gameObject => this.draw(this.context, gameObject));
//
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Game();