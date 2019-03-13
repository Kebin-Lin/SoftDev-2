// Kevin Lin
// SoftDev2 Pd7
// K09 -- Connect the Dots. . .
// 2019-03-13

//A lot of code was re-used from K02...

var pic = document.getElementById("vimage");
var clearButton = document.getElementById("but_clear");
var prevX = null;
var prevY = null;

var drawDot = function(x,y) {
  var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute( "cx", x );
  c.setAttribute( "cy", y );
  c.setAttribute( "r", "5" );
  c.setAttribute( "fill", "#B497D6" );
  c.setAttribute( "stroke", "black" );
  pic.appendChild( c );
}

var clear = function() {
  prevX = null;
  prevY = null;
  while (pic.firstChild) { //Deletes all children
    pic.removeChild(pic.firstChild);
  }
}

var drawLine = function(x0, y0, x1, y1) {
  var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
  l.setAttribute('x1', x0);
  l.setAttribute('y1', y0);
  l.setAttribute('x2', x1);
  l.setAttribute('y2', y1);
  l.setAttribute('stroke', "#AEC6CF");
  pic.appendChild( l );
}

clearButton.addEventListener('click', clear);
pic.addEventListener('click', function(event) {
  var x = event.offsetX; //Relative x coordinate of the mouse to the canvas
  var y = event.offsetY; //Relative y coordinate of the mouse to the canvas
  event.preventDefault(); //Stops click action from being executed
  if (prevX != null) {
    var vector = [x - prevX, y - prevY]; //Vector created from the previous point to the new point
    var mag = Math.sqrt(Math.pow(vector[0],2) + Math.pow(vector[1],2)) //Magnitude of the vector
    //Normalize vector
    vector[0] /= mag; //
    vector[1] /= mag; //
    //Multiply vector by circle radius
    vector[0] *= 5; //
    vector[1] *= 5; //
    x0 = prevX + vector[0]; //Offset x and y by vector
    y0 = prevY + vector[1];
    drawLine(x0, y0, x, y);
  }
  drawDot(x,y);
  prevX = x;
  prevY = y;
});
