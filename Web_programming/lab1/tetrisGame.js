const canvas = document.getElementById('canvasid');
let ctx = canvas.getContext('2d');

window.addEventListener('keydown', keydownListenerSpace);

const nextFigure = document.getElementById('nextFigureid');
let ctxnf = nextFigure.getContext('2d');

changeScoreTable(JSON.parse(localStorage.getItem('scoreTable')));

let figures=[
    [
        [[-1,0],[0,1],[1,1]],//s
        [[0,-1],[-1,0],[-1,1]],
        [[-1,0],[0,1],[1,1]],
        [[0,-1],[-1,0],[-1,1]]
    ],
    [
        [[-1,1],[0,1],[1,0]],//z
        [[-1,-1],[-1,0],[0,1]],
        [[-1,1],[0,1],[1,0]],
        [[-1,-1],[-1,0],[0,1]]
    ],
    [
        [[0,-1],[0,1],[0,2]],//I
        [[-1,0],[1,0],[2,0]],
        [[0,-1],[0,1],[0,2]],
        [[-1,0],[1,0],[2,0]]
    ],
    [
        [[0,1],[0,2],[1,0]],//L
        [[-2,0],[-1,0],[0,1]],
        [[-1,0],[0,-2],[0,-1]],
        [[0,-1],[1,0],[2,0]]
    ],
    [
        [[1,0],[1,1],[1,2]],//L-обр
        [[-1,0],[-2,0],[0,-1]],
        [[0,-1],[0,-2],[1,0]],
        [[0,1],[1,0],[2,0]]
    ],
    [
        [[-1,0],[0,1],[1,0]],//T
        [[-1,0],[0,-1],[0,1]],
        [[-1,0],[0,-1],[1,0]],
        [[1,0],[0,-1],[0,1]]
    ],
    [
        [[0,1],[1,0],[1,1]],//square
        [[0,1],[1,0],[1,1]],
        [[0,1],[1,0],[1,1]],
        [[0,1],[1,0],[1,1]]
    ]
]
let colors=['darkviolet','orange','blue','green','red','violet','brown'];
let field = new Array(18);

let gameIsStarted = false;
let gameIsPaused = false;
let interval;
let timerId;
let numberOfFigure = 0;
let numberOfNextFigure = 0;
let currentFigure = figures[0][0];
let posX = 4;
let posY = 18;
let color = 'green';
let angularPosition = 0;
let score = 0;
document.getElementById('scoreid').innerHTML = score;
createNextFigure();

function keydownListener(e){
    function moveRL(direction){//движение фигуры вправо(+1)/влево(-1)
        let moveFlag = true;
        if(!isAllowable(posX+direction, posY) || isAllowable(posX+direction, posY) && field[posY][posX+direction] != -1){
            moveFlag = false;
        }
        for(let i=0; i<3; i++){
            if(isAllowable(posX + currentFigure[i][0]+direction,posY+currentFigure[i][1]) == false || isAllowable(posX + currentFigure[i][0]+direction,posY+currentFigure[i][1]) && field[posY+currentFigure[i][1]][posX + currentFigure[i][0]+direction] != -1){
                moveFlag = false;
            }
        }
        if(moveFlag){
            clearFigure();
            posX+=direction;
            drawFigure();
        }
    }
    if(e.keyCode == 37){
        moveRL(-1);
    } else if (e.keyCode == 39) {
        moveRL(1);
    } else if (e.keyCode == 40) {
        move();
    } else if (e.keyCode == 38){
        rotate();
    }
}

function keydownListenerSpace(e){
    if (e.keyCode == 32){
        if(gameIsStarted && !gameIsPaused){
            pauseGame();
        } else if(!gameIsStarted && !gameIsPaused){
            startGame();
        } else if(gameIsStarted && gameIsPaused){
            timerId = setInterval(move, interval);
            window.addEventListener('keydown', keydownListener);
            gameIsPaused = false;
        }

    }
}



function startGame(){
    window.addEventListener('keydown', keydownListener);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i<18;i++){
        field[i] = new Array(10);
        for(let j = 0; j<10;j++){
            field[i][j] = -1;//по ячейке 0 можно двигаться
        }
    }
    score = 0;
    createFigure();
    interval = 300;
    timerId = setInterval(move, interval);
    gameIsStarted = true;
}

function pauseGame(){
    clearInterval(timerId);
    window.removeEventListener('keydown', keydownListener);
    gameIsPaused = true;
}

function endGame(){
    clearInterval(timerId);
    window.removeEventListener('keydown', keydownListener);
    gameIsStarted = false;
    gameIsPaused = false;
    ctx.font = "48px monospace";
    ctx.fillStyle = "black";
    ctx.fillText("GAME OVER", 20, 300);
    scoreTable();
}
function drawFigure(){
    ctx.fillStyle = color;
    ctx.fillRect(posX*30,canvas.height -  posY*30-30, 29, 29);
    for(let i = 0; i<3; i++){
        ctx.fillRect((posX+currentFigure[i][0])*30, canvas.height - (posY+currentFigure[i][1]+1)*30, 29, 29);
    }
}

function drawNextFigure(){
    let x;
    let y;
    ctxnf.clearRect(0,0,nextFigure.width,nextFigure.height);
    ctxnf.fillStyle = colors[numberOfNextFigure];
    switch(numberOfNextFigure){
        case 0:
        case 1:
        case 2:
        case 5:
            x = 2;
            y = 1.5;
            break;
        case 3:
        case 4:
            x = 1.5;
            y = 1;
            break;
        case 6:
            x = 1.5;
            y = 1.5;
            break;
    }
    ctxnf.fillRect(x*30,nextFigure.height -  y*30-30, 29, 29);
    for(let i = 0; i<3; i++){
        ctxnf.fillRect((x+figures[numberOfNextFigure][0][i][0])*30, nextFigure.height - (y+figures[numberOfNextFigure][0][i][1]+1)*30, 29, 29);
    }
}

function clearFigure(){
    ctx.clearRect(posX*30,canvas.height - posY*30-30, 30, 30);
    for(let i=0; i<3; i++){
        ctx.clearRect((posX+currentFigure[i][0])*30,canvas.height - (posY+currentFigure[i][1]+1)*30, 30, 30);
    }
}

function move(){//движение фигуры вниз
    let moveFlag = true;
    if(posY == 0|| isAllowable(posX, posY-1) && field[posY-1][posX] != -1){
        moveFlag = false;
    }
    for(let i=0; i<3; i++){
        if(posY + currentFigure[i][1] == 0 || isAllowable(posX + currentFigure[i][0],posY+currentFigure[i][1]-1) && field[posY+currentFigure[i][1]-1][posX + currentFigure[i][0]] != -1){
            moveFlag = false;
        }
    }
    if(moveFlag == true){
        clearFigure();
        posY--;
        drawFigure();
    } else {
        if(isAllowable(posX, posY)){
            field[posY][posX] = numberOfFigure;
        } else {
            endGame();
            return;
        }
        for(let i=0; i<3; i++){
            if(isAllowable(posX + currentFigure[i][0], posY+currentFigure[i][1])){
                field[posY+currentFigure[i][1]][posX + currentFigure[i][0]] = numberOfFigure;
            }else{
                endGame();
                return;
            }
        }
        checkLines();
        createFigure();
    }
}

function isAllowable(x, y){
    return x>=0 && x<10 && y>=0 && y<18
}
function rotate(){
    let rotationFlag = true;
    if(!isAllowable(posX, posY) || isAllowable(posX, posY) && field[posY][posX] != -1){
        rotationFlag = false;
    }
    for(let i=0; i<3; i++){
        newFigure = figures[numberOfFigure][(angularPosition+1)%4]
        if(!isAllowable(posX + newFigure[i][0],posY+newFigure[i][1]) || isAllowable(posX + newFigure[i][0],posY+newFigure[i][1]) && field[posY+newFigure[i][1]][posX + newFigure[i][0]] != -1){
            rotationFlag = false;
        }
    }
    if(rotationFlag){
        clearFigure();
        angularPosition = (angularPosition+1)%4;
        currentFigure = figures[numberOfFigure][angularPosition];
        drawFigure();
    }
}

function createNextFigure(){
    numberOfNextFigure = Math.round(Math.random()*(figures.length-1));//number of figure
    drawNextFigure();
}

function createFigure(){
    numberOfFigure = numberOfNextFigure;//number of figure
    angularPosition = 0;
    currentFigure = figures[numberOfFigure][angularPosition];
    color = colors[numberOfFigure];
    posX = 4;
    posY = 18;
    drawFigure();
    createNextFigure();
}

function checkLines(){
    let numberOfDeletedLines = 0;
    for(let i=0; i<18; i++){
        let checkFlag = true;
        for(let j=0; j<10; j++){
            if(field[i][j] == -1){
                checkFlag = false;
            }
        }
        if(checkFlag){
            let MyImage = ctx.getImageData(0,0,canvas.width, (18-i)*30-30);
            ctx.clearRect(0, 0, canvas.width, (18-i)*30);
            ctx.putImageData(MyImage,0,30);
            numberOfDeletedLines++;
            for(let k = i; k<17; k++){
                field[k] = field[k+1];
            }
            field[17] = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
            i--;
        }
    }
    if(numberOfDeletedLines!=0){
        switch(numberOfDeletedLines){
            case 1:
                score+=100;
                break;
            case 2:
                score+=300;
                break;
            case 3:
                score+=700;
            case 4:
                score+=1500;
                break;
            default:
                console.log('number of deleted lines is wrong!');
                break;
        }
        document.getElementById('scoreid').innerHTML = score;
        if(score>10000){
            clearInterval(timerId);
            interval = 150;
            timerId = setInterval(move, interval);
        }
    }
}

function scoreTable(){
    let player = localStorage.getItem('player');
    let records = localStorage.getItem('scoreTable');
    if(records!=null){
        records = JSON.parse(records);
    } else {
        records = [];
        records.push({name: player, score: score});
        localStorage.setItem('scoreTable', JSON.stringify(records));
        changeScoreTable(records);
        return;
    }
    let scoreTableSize = records.length;
    if(scoreTableSize<6){
        records.push({name: player, score: score});
        records.sort(function(a,b){
            return b.score - a.score;
        });
        localStorage.setItem('scoreTable', JSON.stringify(records));
        changeScoreTable(records);
        return;
    } else {
        if(records[5].score>score){
            return;
        } else {
            records.pop();
            records.push({name: player, score: score});
            records.sort(function(a,b){
                return b.score - a.score;
            });
            localStorage.setItem('scoreTable', JSON.stringify(records));
            changeScoreTable(records);
            return;
        }
    }
}

function changeScoreTable(records){
    if(records == null){
        return;
    }
    let table = document.getElementById('tableid');
    if(table == null){
        table = document.createElement('table');
    }
    table.innerHTML = "";
    for (var i = 0; i < records.length; i++) {
        let row = document.createElement('tr');
        let data = document.createElement('td');
        let cellText = document.createTextNode(records[i].name);
        data.appendChild(cellText);
        row.appendChild(data);
        data = document.createElement('td');
        data.className = "score";
        cellText = document.createTextNode(records[i].score);
        data.appendChild(cellText);
        row.appendChild(data);
        table.appendChild(row);
    }
}
