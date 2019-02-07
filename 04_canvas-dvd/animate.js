/*
Team Lingo -- Kevin Lin, Jason Lin
SoftDev2 pd7
K04 -- What is it saving the screen from?
2019-02-06
*/


var canvas = document.getElementById("playground");
var ctx = canvas.getContext('2d'); //Instantiate the context of the canvas

//Bind the buttons to variables to be used later
var dotButton = document.getElementById("circle");
var stopButton = document.getElementById("stop");
var dvdButton = document.getElementById("dvd");

//Instatiate variables for circle animation
var requestID;
var radius = 0;
var rate = 2;

//Declare variables for DVD rectangle
var rectX;
var rectY;
var rectWidth;
var rectHeight;
var velX;
var velY;

//Get the DVD image based on file name
var logo = new Image();
logo.src = "logo-dvd.png";

var dvdLogoSetup = function() {
  window.cancelAnimationFrame(requestID);

  rectWidth = 100;
  rectHeight = 50;

  rectX = Math.floor(Math.random() * (canvas.width - rectWidth));
  rectY = Math.floor(Math.random() * (canvas.height - rectHeight));

  velX = 2;
  velY = 2;

  var drawDVD = function() {
    clear();
    ctx.drawImage(logo,rectX,rectY,rectWidth,rectHeight);
    //Checks if the future xy coordinate is out of bounds
    //If it is, then reverse velocity and return it back to where it was
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
  window.cancelAnimationFrame(requestID); //Stops perpetuation of requestAnimationFrame
}

ctx.fillStyle = "#B497D6"; //Purple
dotButton.addEventListener("click", draw);
stopButton.addEventListener("click", stopIt);
dvdButton.addEventListener("click", dvdLogoSetup);
