import Player from './player.js';

const game = () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let time = new Date(),
    currentTime = new Date(),
    deltaTime = 0;

    let gameObjects = [];
    let player = new Player('player-1', { x: 200, y: 200 })
    
    gameObjects.push(player);


    const render = (gameObjects, canvas, context) => {
        currentTime = new Date();
        deltaTime = currentTime - time;
        time = currentTime;

        context.clearRect(0, 0, canvas.width, canvas.height);

        gameObjects.forEach(updateable => updateable.update(deltaTime / 1000));
        gameObjects.forEach(drawable => drawable.draw(context));
    
        window.requestAnimationFrame(() => {
            render(gameObjects, canvas, context);
        })
    }


    render(gameObjects, canvas, context);
}





game();