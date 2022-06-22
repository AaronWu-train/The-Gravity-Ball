var canvas = document.getElementById("canvas")
var demos = document.getElementById("demoimg")
// canvas.width =  $(window).width()*0.35; 
canvas.width =   demos.clientWidth;
canvas.height =  demos.clientHeight; 
var ctx = canvas.getContext("2d"); 
var ballRadius = 30;
var smallBallRaius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;
var relativeX = 0;
var relativeY = 0;
var cosx = 0;
var siny = 0;
function getPosition (element) {
    var x = 0;
    var y = 0;
    while ( element ) {
      x += element.offsetLeft - element.scrollLeft + element.clientLeft;
      y += element.offsetTop - element.scrollLeft + element.clientTop;
      element = element.offsetParent;
    }
    return { x: x, y: y };
  }
document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e) {
    var temp = getPosition(canvas);
    relativeX = e.clientX - $(window).width() + canvas.width; 
    relativeY =  e.clientY - (temp.y-scrollY);
    console.log(relativeX,relativeY,canvas.offsetLeft,canvas.offsetTop);
}
function changeWay(){
    ax = relativeX - x;
    ay = relativeY - y;
    cosx = ax / Math.sqrt(ax**2 + ay**2);
    siny = ay / Math.sqrt(ax**2 + ay**2);
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x+14*cosx, y+14*siny, smallBallRaius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
}
setInterval(draw,5);
setInterval(changeWay, 15); 

var clicks = 5
function cat() {
    clicks--;
    var fff = document.getElementById("cat");
    fff.innerHTML = clicks+" more clicks remain";
    if (clicks == 0) {
        fff.setAttribute("href", "https://popcat.click/");
    }
    // alert("never gonna give you up")
}