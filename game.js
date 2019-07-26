const snakeHead = {
    position: [302,302],
    direction: 1,
    isDead: false,
};

const snakeBodyConstructor = function(startingPosition, direction) {
    this.position = startingPosition;
    this.direction = direction;
}

let step, score, clock, pause, snake;
let hasStarted = false;

document.addEventListener('keypress', (e) => {
    if(!hasStarted){
        startGame();
        mainLoop();
        return;
    }
    switch(e.keyCode){
        case 119:   // up (W)
            snakeHead.direction = 4;
            break;
        case 115:   // down (S)
            snakeHead.direction = 2;
            break;
        case 97:    // left (A)
            snakeHead.direction = 3;
            break;
        case 100:   // right (R)
            snakeHead.direction = 1;
            break;
        case 112:   // pause (P)
            pause = pause? false : true;
            break;
    }
});

function setPosition(object) {
    object.style.left = snakeHead.position[0];
    object.style.top = snakeHead.position[1];
}

function nextFrame() {
    switch(snakeHead.direction){
        case 4:   // up
            snakeHead.position[1] -= 30;
            break;
        case 2:   // down
            snakeHead.position[1] += 30;
            break;
        case 3:    // left
            snakeHead.position[0] -= 30;
            break;
        case 1:   // right
            snakeHead.position[0] += 30;
            break;
    }
    checkDeath();
    if(!snakeHead.isDead){
        setPosition(document.querySelector('.snake'));
    }
}

function checkDeath(){
    if(snakeHead.position[0] < 0 || snakeHead.position[0] > 595 || snakeHead.position[1] < 0 || snakeHead.position[1] > 595 ){
        snakeHead.isDead = true;
    }
}

function processDeath() {
    let text = document.querySelector('.text');
    text.style.display = 'initial';
    text.innerHTML = 'game over';
    setTimeout(() => {
        text.innerHTML = 'Press any key to start';
        hasStarted = false;
    }, 1500);
}

function startGame() {
    step = 1; score = 0; clock = 400; pause = false; hasStarted = true; 

    snakeHead.direction = 1;
    let text = document.querySelector('.text');
    text.style.display = 'none';

    snakeHead.isDead = false;
    snakeHead.position = [302,302];
    snake = [snakeHead];
    setPosition(document.querySelector('.snake'));
}

async function mainLoop(){
    step++;

    nextFrame();
    if(snakeHead.isDead){
        processDeath();
        return;
    }
    if(!snakeHead.isDead){
        setTimeout(() => mainLoop(),clock);
    }
};