import Observer from './observer.js';
import InputManager from './input-manager.js';

class Player extends Observer {
    constructor(name, position) {
        super();

        this.name = name;
        this.position = position;
        this.radius = 10;
        this.speed = 200;
        this.input = {};

        this.notify = (input) => {
            this.input = input;
        }

        InputManager.subscribe(this);
    }

    update(deltaTime) {
        if(this.input.W) {
            this.position.y -= this.speed * deltaTime;
        }

        if(this.input.S) {
            this.position.y += this.speed * deltaTime;
        }

        if(this.input.A) {
            this.position.x -= this.speed * deltaTime;
        }

        if(this.input.D) {
            this.position.x += this.speed * deltaTime;
        }

        if(this.position.x > 512 + this.radius) {
            this.position.x = 0 - this.radius;
        }

        if(this.position.x < 0 - this.radius) {
            this.position.x = 512 + this.radius;
        }

        if(this.position.y > 512 + this.radius) {
            this.position.y = 0 - this.radius;
        }

        if(this.position.y < 0 - this.radius) {
            this.position.y = 512 + this.radius;
        }
    }

    draw(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#003300';
        context.stroke();
    }
}

export default Player;