var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d"); 
var ballRadius = 15;
var smallBallRaius = 5;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var relativeX = 0;
var relativeY = 0;
var cosx = 0;
var siny = 0;
var speedLimit = 5;
var score = 0;
var time = 0;
var interval;
var foodList = []
var bigFoodList = []
var bombList = []
var level = 1;
var scorelimits = [0,40,70,100,250,500,9999];
var foodAmount = [0,10,15,15,25,25,25];
var bigFoodAmount = [0,3,3,10,15,15,15];
var bombAmount = [0,0,5,7,15,25,50];
var BadBallList=[];
var BadBallStartPos=[];
var kt;

document.addEventListener("mousemove", mouseMoveHandler);

function getRandom(min, max) {
    return Math.round( Math.random() * (max - min) + min );
}

function mouseMoveHandler(e) {
    relativeX = e.clientX - canvas.offsetLeft;
    relativeY = e.clientY;
    
}
function changeWay(){
    ax = relativeX - x;
    ay = relativeY - y;
    cosx = ax / Math.sqrt(ax**2 + ay**2);
    siny = ay / Math.sqrt(ax**2 + ay**2);
    dx += 0.15*cosx;
    dy += 0.15*siny;
    if (Math.abs(dx) > speedLimit || Math.abs(dy) > speedLimit) {
        dx *= 10.0/11.5;
        dy *= 10.0/11.5; 
    }
}

ctx.beginPath();
ctx.rect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "#550212";
ctx.fill();
ctx.closePath();
var img = new Image();
img.src = 'images/pipeRight.png';
for (var i = 100; i < canvas.height; i+=220) {
    ctx.drawImage(img,canvas.width-40,i,50,50);
}

function drawImage(path,lx,ly,size,startTime,continueTime) {
    var img10 = new Image();
    img10.src = path;
    var k = setInterval(function(){
        if (startTime + continueTime > time) {
            ctx.drawImage(img10,lx,ly,size,size);
        }
        else{
            clearInterval(k);
        }
    },5)
}

function levelUp(){
    clearInterval(interval);
    level++;
    var startTime = time;
    var levelImg = new Image();
    levelImg.src = "images/levelup.png";
    kt = setInterval(function(){
        if (startTime + 300 > time) {
            ctx.drawImage(levelImg,250,100,500,500);
        }
        else{
            clearInterval(kt);
            interval = setInterval(draw,5);
        }
    },5)
    // setTimeout(function(){
    // }, 1000);
    
}

function bkg(){
    // right
        var img = new Image();
        img.src = 'images/pipeRight.png';
        for (var i = 100; i < canvas.height; i+=220) {
            ctx.drawImage(img,canvas.width-40,i,50,50);
        }
    // left 
    if (level > 2) {
        var imgleft = new Image();
        imgleft.src = 'images/pipeLeft.png';
        for (var i = 100; i < canvas.height; i+=220) {
            ctx.drawImage(imgleft,0,i,50,50);
        }
    } 
    
}
function drawBadBall() {
    
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x+7*cosx, y+7*siny, smallBallRaius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function plusOne(lx,ly, startTime){
    var img3 = new Image();
    img3.src = "images/plusOne.png";
    var k = setInterval(function(){
        ctx.clearRect(lx,ly,30,30);
        drawBall();
        lx = lx+0.1;
        ly = ly-0.5;
        if (startTime + 100 > time) {
            ctx.drawImage(img3,lx,ly,30,30);
        }
        else{
            clearInterval(k);
        }
    },5)
}
function addfood(){
    for (var i = 0; i < foodAmount[level]; ++i) {
        foodList[i].notshow-=1;
    }
    for (var i = 0; i < bigFoodAmount[level]; ++i) {
        bigFoodList[i].notshow-=1;
    }
}
function drawFood() {
    while(foodList.length < foodAmount[level]){
        foodList.push({x: getRandom(70,canvas.width-100), y:getRandom(10,canvas.height-10), notshow:0});
    }
    for (var i = 0; i < foodAmount[level]; ++i) {
        if ((foodList[i].notshow <= 0) && x+ballRadius > foodList[i].x - 15 && x-ballRadius < foodList[i].x+15 &&
            y+ballRadius > foodList[i].y - 15 && y-ballRadius < foodList[i].y+15) {
                score++;
                plusOne(foodList[i].x+15,foodList[i].y-15,time);
                if (score >= scorelimits[level]) levelUp();
                foodList[i].x = getRandom(70,canvas.width-100);
                foodList[i].y = getRandom(15,canvas.height-20);
                foodList[i].notshow = Math.round(getRandom(0,50));
                // console.log("eee");
            }
        if (foodList[i].notshow < 1.0) {
            // console.log(foodList[i].notshow);
            ctx.beginPath();
            ctx.rect(foodList[i].x ,foodList[i].y ,15,15);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        }          
    }
}

function drawBigFood() {
    while(bigFoodList.length < bigFoodAmount[level]){
        bigFoodList.push({x: getRandom(70,canvas.width-100), y:getRandom(10,canvas.height-10), notshow:0});
    }
    for (var i = 0; i < bigFoodAmount[level]; ++i) {
        if ((bigFoodList[i].notshow <= 0) && x+ballRadius > bigFoodList[i].x - 15 && x-ballRadius < bigFoodList[i].x+15 &&
            y+ballRadius > bigFoodList[i].y - 15 && y-ballRadius < bigFoodList[i].y+15) {
                score+=3;
                plusOne(bigFoodList[i].x+15,bigFoodList[i].y-15,time);
                plusOne(bigFoodList[i].x+15,bigFoodList[i].y-45,time);
                plusOne(bigFoodList[i].x+15,bigFoodList[i].y+5,time);
                if (score >= scorelimits[level]) levelUp();
                bigFoodList[i].x = getRandom(70,canvas.width-100);
                bigFoodList[i].y = getRandom(15,canvas.height-20);
                bigFoodList[i].notshow = Math.round(getRandom(0,50));
                // console.log("eee");
            }
        if (bigFoodList[i].notshow < 1.0) {
            // console.log(foodList[i].notshow);
            ctx.beginPath();
            ctx.rect(bigFoodList[i].x ,bigFoodList[i].y ,20,20);
            ctx.fillStyle = "aqua";
            ctx.fill();
            ctx.closePath();
        }          
    }
}

function minusThree(lx,ly, startTime){
    var img4 = new Image();
    img4.src = "images/minusOne.png";
    var k = setInterval(function(){
        ctx.clearRect(lx,ly-30,30,90);
        drawBall();
        lx = lx+0.1;
        ly = ly-0.5;
        if (startTime + 100 > time) {
            ctx.drawImage(img4,lx,ly,30,30);
            ctx.drawImage(img4,lx,ly+30,30,30);
            ctx.drawImage(img4,lx,ly-30,30,30);
        }
        else{
            clearInterval(k);
        }
    },5)
}
function addbomb(){
    for (var i = 0; i < bombAmount[level]; ++i) {
        bombList[i].notshow-=1;
    }
}
function drawBomb() {
    while (bombList.length < bombAmount[level]) {
        bombList.push({x: getRandom(70,canvas.width-100), y:getRandom(10,canvas.height-10), notshow:0});
    }
    for (var i = 0; i < bombAmount[level]; ++i) {
        if ((bombList[i].notshow <= 0) && x+ballRadius > bombList[i].x - 15 && x-ballRadius < bombList[i].x+15 &&
            y+ballRadius > bombList[i].y - 15 && y-ballRadius < bombList[i].y+15) {
                score -= 3;
                minusThree(bombList[i].x+15,bombList[i].y-15,time);
                bombList[i].x = getRandom(100,canvas.width-100);
                bombList[i].y = getRandom(15,canvas.height-20);
                bombList[i].notshow = Math.round(getRandom(0,50));
                // console.log("eee");
            }
        if (bombList[i].notshow < 1.0) {
            // console.log(foodList[i].notshow);
            ctx.beginPath();
            ctx.rect(bombList[i].x ,bombList[i].y ,20,20);
            ctx.fillStyle = "#ff4b2b";
            ctx.fill();
            ctx.closePath();
        }          
    }
}

function drawScore() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "gray";
    ctx.fillText("score: ", 8, 50);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#00ffff";
    ctx.fillText(score, 80, 50);
    ctx.font = "25px Arial";
    ctx.fillStyle = "gray";
    ctx.fillText("goal: "+scorelimits[level], 8, 75);
}
var gameoversign;
function GameOver() {
    clearInterval(interval);
    var img2 = new Image();
    img2.src = "images/gameover.png";
    gameoversign = setInterval(function(){ctx.drawImage(img2,250,100,500,500);}, 5);  
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bkg();
    drawBall();
    drawFood();
    drawBigFood();
    drawBomb();
    drawScore();
    if(x+dx > canvas.width-ballRadius || x+dx<ballRadius) {
        dx=-dx*3;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius){ 
        dy=-dy*3;
    }
    // if (Math.abs(dx) > speedLimit || Math.abs(dy) > speedLimit) {
    //     dx *= 10.0/13;
    //     dy *= 10.0/13; 
    // }
    x += dx;
    y += dy;
}
var intervalChangeway
var intervalAddfood

function init(){
    var restartButton = document.getElementById("startButton");
    restartButton.innerHTML = 'RESTART'
    clearInterval(interval);
    clearInterval(kt);
    clearInterval(gameoversign);
    clearInterval(intervalChangeway);
    clearInterval(intervalAddfood);
    score = 10;
    time = 0;
    level = 1;    
    var basicInterval = setInterval(function(){
        time++;
        if ( score < 0 ) {
            GameOver();
        }
    }) 
    interval = setInterval(draw, 5);  
    intervalChangeway = setInterval(changeWay, 15); 
    intervalAddfood = setInterval(addfood, 100); 
    intervalAddfood = setInterval(addbomb, 100); 
}

// JavaScript code goes here