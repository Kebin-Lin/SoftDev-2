// Team Lingo -- Jason Lin, Kevin Lin
// SoftDev2 Pd7
// K01 -- ...and I want to Paint It Better
// 2019-02-01

var boxState = "dot";
var toggleButton = document.getElementById("toggleButton");
var clearButton = document.getElementById("clearButton");
var canvas = document.getElementById("slate");
var ctx = canvas.getContext('2d');
var modeDisp = document.getElementById("modeDisp");

var toggleMode = function() { //Toggles drawing mode between rectangle and dot
  if (boxState == "dot") {
    boxState = "rect";
    modeDisp.innerHTML = "Current Drawing Mode: Rectangle";
  } else {
    boxState = "dot";
    modeDisp.innerHTML = "Current Drawing Mode: Dot";
  }
}

var drawDot = function(x,y) {
  ctx.fillStyle = "#B497D6";
  ctx.beginPath(); //Starts new drawing path
  ctx.ellipse(x, y, 5, 5, 0, 0, Math.PI * 2); //Defines a path of a circle of radius 2
  ctx.fill(); //Fill in path
}

var drawRect = function(x,y) {
  ctx.fillStyle = "#6E44FF";
  ctx.fillRect(x, y, 50, 50); //Draws a square centered around the mouse
}

var clear = function() {
  ctx.clearRect(0,0,canvas.width,canvas.height); //Clears the entire canvas
}

toggleButton.addEventListener('click', toggleMode);
clearButton.addEventListener('click', clear);
canvas.addEventListener('click', function(event) {
  var x = event.offsetX; //Relative x coordinate of the mouse to the canvas
  var y = event.offsetY; //Relative y coordinate of the mouse to the canvas
  event.preventDefault(); //Stops click action from being executed
  switch(boxState) {
    case "dot": //Executes if boxState == "dot"
      drawDot(x,y);
      break;
    case "rect": //Executes if boxState == "rect"
      drawRect(x,y);
      break;
  }
});
