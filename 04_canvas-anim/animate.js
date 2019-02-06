// Team Lingo -- Jason Lin, Kevin Lin
// SoftDev2 Pd7
// K03 -- They lock us in the tower whenever we get caught ...which is often
// 2019-02-06

var canvas = document.getElementById("playground");
var ctx = canvas.getContext('2d');
var dotButton = document.getElementById("circle");
var stopButton = document.getElementById("stop");
var dvdButton = document.getElementById("dvd");

var currRadius = 0;
var requestID;
var radius = 0;
var growing = false;
var rate = 2;

var rectX;
var rectY;
var rectWidth;
var rectHeight;
var velX;
var velY;

var logo = new Image();
logo.src = "logo-dvd.png";

var dvdLogoSetup = function() {
  window.cancelAnimationFrame(requestID);

  rectWidth = 100;
  rectHeight = 50;

  rectX = Math.floor(Math.random() * (canvas.width - rectWidth));
  rectY = Math.floor(Math.random() * (canvas.height - rectHeight));

  velX = 1;
  velY = 1;

  var drawDVD = function() {
    clear();
    ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
    newX = rectX + velX;
    newY = rectY + velY;
    if (newX < 0 || newX > canvas.width - rectWidth) {
      velX *= -1;
      newX = rectX + velX;
    }
    if (newY < 0 || newY > canvas.height - rectHeight) {
      velY *= -1;
      newY = rectY + velY;
    }
    rectX = newX;
    rectY = newY;
    requestID = window.requestAnimationFrame(drawDVD);
  }

  drawDVD();
}

var draw = function() {
  window.cancelAnimationFrame(requestID);
  drawDot();
}

var drawDot = function() {
  clear();
  ctx.beginPath(); //Starts new drawing path
  ctx.ellipse(canvas.width / 2, canvas.height / 2, radius, radius, 0, 0, Math.PI * 2); //Defines a path of a circle of radius 2
  ctx.fill(); //Fill in path
  var newRadius = radius + rate;
  if (newRadius < 0 || newRadius > canvas.width / 2) { //If the circle would be out of bounds or negative in size, negate growth rate
    rate *= -1;
    newRadius = radius + rate;
  }
  radius = newRadius;
  requestID = window.requestAnimationFrame(drawDot); //Updates requestID for future stopping
}

var clear = function() {
  ctx.clearRect(0,0,canvas.width,canvas.height); //Clears the entire canvas
}

var stopIt = function() {
  growing = false;
  window.cancelAnimationFrame(requestID); //Stops perpetuation of requestAnimationFrame
}

ctx.fillStyle = "#B497D6"; //Purple
dotButton.addEventListener("click", draw);
stopButton.addEventListener("click", stopIt);
dvdButton.addEventListener("click", dvdLogoSetup);
