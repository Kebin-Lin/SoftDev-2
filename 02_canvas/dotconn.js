// Team Lingo -- Jason Lin, Kevin Lin
// SoftDev2 Pd7
// K02 -- Connecting the Dots
// 2019-02-04

var boxState = "dot";
var clearButton = document.getElementById("clear");
var canvas = document.getElementById("playground");
var ctx = canvas.getContext('2d');
var prevX = null;
var prevY = null;

var drawDot = function(x,y) {
  ctx.beginPath(); //Starts new drawing path
  ctx.ellipse(x, y, 5, 5, 0, 0, Math.PI * 2); //Defines a path of a circle of radius 2
  ctx.fill(); //Fill in path
}

var clear = function() {
  prevX = null;
  prevY = null;
  ctx.clearRect(0,0,canvas.width,canvas.height); //Clears the entire canvas
}

ctx.fillStyle = "#B497D6"; //Purple
ctx.strokeStyle = "#6E44FF"; //Darker Purple
clearButton.addEventListener('click', clear);
canvas.addEventListener('click', function(event) {
  var x = event.offsetX; //Relative x coordinate of the mouse to the canvas
  var y = event.offsetY; //Relative y coordinate of the mouse to the canvas
  event.preventDefault(); //Stops click action from being executed
  ctx.beginPath();
  if (prevX != null) {
    var vector = [x - prevX, y - prevY]; //Vector created from the previous point to the new point
    var mag = Math.sqrt(Math.pow(vector[0],2) + Math.pow(vector[1],2)) //Magnitude of the vector
    //Normalize vector
    vector[0] /= mag; //
    vector[1] /= mag; //
    //Multiply vector by circle radius
    vector[0] *= 5; //
    vector[1] *= 5; //
    ctx.moveTo(prevX + vector[0], prevY + vector[1]); //Offset x and y by vector
    ctx.lineTo(x,y); //Draw line to center of the next circle
    ctx.stroke();
  }
  drawDot(x,y);
  prevX = x;
  prevY = y;
});
