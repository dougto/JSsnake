const snakeHead = {
    position: [302,302],
    direction: 1,
    isDead: false,
};

let step, score, clock, pause;
let hasStarted = false;

document.addEventListener('keypress', (e) => {
    if(!hasStarted){
        startGame();
        mainLoop();
        return;
    }
    switch(e.keyCode){
        case 119:   // up
            snakeHead.direction = 4;
            break;
        case 115:   // down
            snakeHead.direction = 2;
            break;
        case 97:    // left
            snakeHead.direction = 3;
            break;
        case 100:   // right
            snakeHead.direction = 1;
            break;
        case 112:   // pause
            pause = pause? false : true;
            break;
    }
});

function setPosition() {
    let snakeDiv = document.querySelector('.snake');
    snakeDiv.style.left = snakeHead.position[0];
    snakeDiv.style.top = snakeHead.position[1];
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
        setPosition();
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
    snakeHead.isDead = false;
    snakeHead.position = [302,302];
    setPosition();
    snakeHead.direction = 1;
    let text = document.querySelector('.text');
    text.style.display = 'none';
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