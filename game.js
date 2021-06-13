let gameBoard = document.getElementById("gameBoard");


let snakeBody = [
    {x: 3, y: 5},
    {x: 3, y: 4}
];
let eatSound = new Audio('eat.wav');
let moveSound = new Audio('move.wav');
let gameOverSound = new Audio('gameOver.wav');
let score = 0;
let scoreBored = document.getElementById("scoreBored");
let hiScoreBored = document.getElementById("hiScoreBored");
let a = 2;
let b = 15;
let foodB = [{x:Math.round(a + (b-a)* Math.random()), y:Math.round(a + (b-a)* Math.random())}]

let dir = 0;
let dir2 = 0;

let snakeX = 0;
let snakeY = 0;
window.addEventListener('keydown',e =>{
    let LastInput = e.key;
    if(e.key == 'ArrowRight' && dir2 != -1){
        // }
        moveSound.play();
        dir = 0;
        dir2 = 1;
    }
    else if(e.key == 'ArrowLeft'  && dir2 != 1){
        dir = 0;
        dir2 = -1;
        moveSound.play();
    }
    else if(e.key == 'ArrowUp' && dir != 1){
        dir = -1;
        dir2 = 0;
        moveSound.play();
    }
    else if(e.key == 'ArrowDown' && dir != -1){
        dir = 1;
        dir2 = 0;
        moveSound.play();
    }
    moveSound.play();
})

function createBody(){
    gameBoard.innerHTML = '';
    for(let i = snakeBody.length - 2; i>=0; i--){
        if(dir == 0 && dir2 == 0){
        }else{
            snakeBody[i+1] = {...snakeBody[i]}

        }
        // snakeBody.shift();
    }
    snakeBody[0].x+=dir;
    snakeBody[0].y+=dir2;
    
    snakeBody.forEach(segment=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.x;
        snakeElement.style.gridColumnStart = segment.y;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
    let head = document.querySelector('.snake');
    let tail = document.querySelector('.tail');
    if(dir == 1){
        // head.style.borderEndEndRadius= "50%";
        // head.style.borderEndStartRadius= "50%";
        head.style.transform="rotate(90deg)";
        // snakeLat.style.transform="rotate(90deg)";
        
        // head.style.background= "red";
    }else if(dir == -1){
        // head.style.borderStartEndRadius= "50%";
        // head.style.borderStartStartRadius= "50%";
        head.style.transform="rotate(270deg)";
        // snakeLat.style.transform="rotate(270deg)";
        // head.style.background= "blue";
    }else if(dir2 == 1){
        // head.style.borderStartEndRadius= "50%";
        // head.style.borderEndEndRadius= "50%";
        // head.style.background= "green";
    }else if(dir2 == -1){
        // head.style.borderEndStartRadius= "50%";
        // head.style.borderStartStartRadius= "50%";
        head.style.transform="rotate(180deg)";
        // head.style.background= "#bbb49f";
        // snakeLat.style.transform="rotate(180deg)";
    }
    let snakeL = document.querySelectorAll('.snake');
    snakeLat = document.querySelectorAll('.snake')[snakeL.length-1];
    let tailArr = snakeBody[snakeBody.length-1];
    let tailArr2 = snakeBody[snakeBody.length-2];
    if(tailArr.x + 1 == tailArr2.x && tailArr.y  == tailArr2.y){
        snakeX = 1;
        snakeY = 0;
        
        snakeLat.style.transform="rotate(90deg)";
    }else if(tailArr.x - 1 == tailArr2.x && tailArr.y  == tailArr2.y){
        snakeLat.style.transform="rotate(270deg)";
        snakeX = -1;
        snakeY = 0;
    }else if(tailArr.x == tailArr2.x && tailArr.y -1  == tailArr2.y){
        snakeLat.style.transform="rotate(180deg)";
        snakeX = 0;
        snakeY = -1;
    }else if(tailArr.x == tailArr2.x && tailArr.y + 1  == tailArr2.y){
        console.log('direction');
        snakeLat.style.transform="rotate(0deg)";
        snakeX = 0;
        snakeY = 1;
    }
   head.classList.add('head');
   let snakeLa = document.querySelectorAll('.snake');
   let snakeLast = document.querySelectorAll('.snake')[snakeLa.length-1];
   snakeLast.classList.add('tail');
    foodB.forEach(segment=>{
        let foodElement = document.createElement('div');
        if(snakeBody[0].x == foodB[0].x && snakeBody[0].y == foodB[0].y){
            // level();
            eatSound.play();
            let a = 2;
            let b = 15;
            foodB[0].x = Math.round(a + (b-a)* Math.random());
            foodB[0].y = Math.round(a + (b-a)* Math.random());
            let addN = snakeBody[snakeBody.length-1];
            snakeBody.push({x:addN.x - snakeX, y:addN.y - snakeY});
            score +=1;
            scoreBored.innerHTML = score;
            if(localStorage.getItem('hiScore') == null){
                localStorage.setItem('hiScore',score)
            }
            else if(score >= localStorage.getItem('hiScore')){
                localStorage.setItem('hiScore',score)
            }
            // hiScore +=1;
            hiScoreBored.innerHTML = localStorage.getItem('hiScore');
     }else{

         foodElement.style.gridRowStart = segment.x;
         foodElement.style.gridColumnStart = segment.y;
         foodElement.classList.add('food');
         gameBoard.appendChild(foodElement);
     }
    });
    if(snakeBody[0].x >15 || snakeBody[0].x <1 || snakeBody[0].y >15 || snakeBody[0].y <1){
        gameOverSound.play();
        dir = 0;
        dir2 = 0;
        snakeBody = [
            {x: 3, y: 5},
            {x: 3, y: 4}
        ];
        let alertGame = 'GAME OVER PRESS ENTER TO PLAY AGAIN'
        alert(alertGame);
        // localStorage.se
        score = 0;
        scoreBored.innerHTML = score
    }
    for(i = 1; i<snakeBody.length; i++){
        if(snakeBody[0].x == snakeBody[i].x  &&  snakeBody[0].y == snakeBody[i].y){
        gameOverSound.play();
            dir = 0;
        dir2 = 0;
        snakeBody = [
            {x: 3, y: 5},
            {x: 3, y: 4},
        ];
        let alertGame = 'GAME OVER PRESS ENTER TO PLAY AGAIN'
        alert(alertGame);
        score = 0;
        scoreBored.innerHTML = score
        }
    }
    // console.log(snakeBody[snakeBody.length-1]);
    
   

    
}

let loop = setInterval(createBody,130);

// createBody();

// console.log(level.value);


// headClass.style.borderEndEndRadius= "50%";

// hiScoreBored.innerHTML = localStorage.getItem('hiScore');

