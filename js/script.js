// Elements:
let startButton = document.querySelector("#startButton");
let pauseButton = document.querySelector("#pauseButton");
let ball = document.querySelector("#ball");
let cpu = document.querySelector("#cpu");
let player = document.querySelector("#player");
let painelPoints = document.querySelector("#painelPoints");
let tennisCourt = document.querySelector("#tennisCourt");

// Positions:
let positionPlayerX, positionPlayerY;
let positionBallX, positionBallY;
let positionCpuX, positionCpuY;

//direction according to key:
let directionJy;

// Start Positions:
let startPlayerPositionX=11, startPlayerPositionY=30.5;
let startBallpositionX=47.5, startBallpositionY=30.5;
let startCpuPositionX=85, startCpuPositionY=30.5;

// Size:
let campoW=80, campoH=70;
let barWidth=3, barHeight=30;
let ballWidth=3, ballHeight=3;

player.style.width = barWidth + "vw";
player.style.height = barHeight + "vh";
player.style.left = startPlayerPositionX + "vw";

ball.style.width = ballWidth + "vw";
ball.style.height = ballHeight + "vw";
ball.style.left = startBallpositionX + "vw";

cpu.style.width = barWidth  + "vw";
cpu.style.height = barHeight + "vh";
cpu.style.left = startCpuPositionX + "vw";

// Direction:
let ballX, ballY = 1;
let cpuY=0;

// Velocity:
let velocityBall, velocityCpu, velocityPlayer;

// Console:
let points=0;
let tecla;

var gameOn = false;

k = startButton.addEventListener("click",()=>{
    startGame();
});

k1 = pauseButton.addEventListener("click",()=>{
    pauseGame();
});

function playerControl(){
    if(gameOn){
        positionPlayerY+=velocityPlayer*directionJy;
        if(((positionPlayerY+barHeight)>=campoH||(positionPlayerY+barHeight)<=6.5+barHeight)){
            positionPlayerY+=(velocityPlayer*directionJy)*(-1);
        }
        player.style.top=positionPlayerY+"vh";
    }
}

function cpuControl(){
    if(gameOn){
        if((positionBallX>(campoW/2))&&(ballX>0)){
            // Move CPU:
            if((positionBallY>((positionCpuY+(barHeight/2)))+velocityCpu)){
                // Move Down:
                if((positionCpuY+barHeight)<=campoH){
                    positionCpuY+=velocityCpu;
                }
            } else if(((positionBallY+(ballHeight/2))<((positionCpuY+(barHeight/2)))+velocityCpu)){
                // Move Up:
                if((positionCpuY+barHeight)<=campoH){
                    positionCpuY-=velocityCpu;
                }
            }
        } else {
            // Place CPU in center:
            if((positionCpuY+(barHeight/2))<(campoH/2)){
                positionCpuY+=velocityCpu;
            } else if ((positionCpuY+(barHeight/2))>(campoH/2)){
                positionCpuY-=velocityCpu;
            }
        }
        cpu.style.top=positionCpuY+"vh";
    }
}

function controlBall(){

    // Ball Drive:
    positionBallX+=velocityBall*ballX;
    positionBallY+=velocityBall*ballY;
    
    // Collision with Player:
    if((positionBallX<=positionPlayerX+barWidth)&&((positionBallY+ballHeight>=positionPlayerY)&&(positionBallY<=positionPlayerY+barHeight))){
        ballY=(((positionBallY+(ballHeight/2))-(positionPlayerY+(barHeight/2)))/4);
        ballX*=-1;
    }
    
    // Collision with CPU:
    if((positionBallX>=positionCpuX-barWidth)&&((positionBallY+ballHeight>=positionCpuY)&&(positionBallY<=positionCpuY+barHeight))){
        ballY=(((positionBallY+(ballHeight/2))-(positionCpuY+(barHeight/2)))/4);
        ballX*=-1;
    }
    
    // Upper and Lower Limits:
    if((positionBallY>=70.5)||(positionBallY<=6)){
        ballY*=-1;
    }
    
    // Left and right from the screen:
    if(positionBallX>=(campoW-ballWidth+10)){
        points++;
        control();
    }else if(positionBallX<=0){
        points--;
        control();
    }
    
    ball.style.top=positionBallY+"vh";
    ball.style.left=positionBallX+"vw";

}

function control(){
    velocityBall=0;
    positionBallX=startBallpositionX;
    positionBallY=startBallpositionY;
    positionPlayerY=startPlayerPositionY;
    positionCpuY=startCpuPositionY;
    painelPoints.value=points;
    gameOn=false;
    player.style.top=positionPlayerY+"vh";
    cpu.style.top=positionCpuY+"vh";
    painelPoints.value=points;
    player.style.top=positionPlayerY+"vh";
    cpu.style.top=positionCpuY+"vh";
}

function keyDown(event){
    
    tecla=event.key;
    
    switch(tecla){
    
        case "ArrowUp":
            directionJy=-1;
            playerControl();
            break;

        case "ArrowDown":
            directionJy=1;
            playerControl();
            break;
    
    }

};

function keyUp(event){

    tecla=event.key;
    
    switch(tecla){
    
        case "ArrowUp":
    
            directionJy=0;
            playerControl();
            break;

        case "ArrowDown":
            directionJy=0;
            playerControl();
            break;

    }

};

function game(){

    if(gameOn){
        playerControl();;
        controlBall();
        cpuControl();
        start();
    }

    frames=requestAnimationFrame(game);

};

function startGame(){
    
    if(!gameOn){
        
        velocityBall=velocityCPU=velocityPlayer=1;
        cancelAnimationFrame(frames);
        gameOn=true;
        directionJy=0;
        ballY=0;
    
        if((Math.random()*10)<5){
            ballX=-1;
        }
    
        else{
            ballX=1;
        }

        positionBallX=startBallpositionX;
        positionBallY=startBallpositionY;

        positionPlayerX=startPlayerPositionX;
        positionPlayerY=startPlayerPositionY;
        
        positionCpuX=startCpuPositionX;
        positionCpuY=startCpuPositionY;

        game();

    }

}

function pauseGame(){
    frames=cancelAnimationFrame(frames);
    gameOn = false;
}

function start(){
    velocityBall=velocityPlayer=velocityCpu=1;
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    startButton.addEventListener("click", startGame)
}

window.addEventListener("load", start);