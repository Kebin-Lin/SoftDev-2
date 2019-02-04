
var canvas = document.getElementById("playground");
var ctx = canvas.getContext('2d');
var dotButton = document.getElementById("circle");
var stopButton = document.getElementById("stop");
var currRadius = 0;
var requestID;
var radius = 0;
var growing = false;
var rate = 2;

var draw = function() {
  if (growing == true) {return;} //Checks if the dot is already changing, returns so speed doesn't increase
  growing = true;
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
