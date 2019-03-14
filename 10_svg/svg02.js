// Kevin Lin
// SoftDev2 Pd7
// K10 -- Ask Circles [Change || Die]
// 2019-03-14

//A lot of code was re-used from K02...

var pic = document.getElementById("vimage");
var clearButton = document.getElementById("but_clear");

var dots = {};

var drawDot = function(x,y) {
  var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute( "cx", x );
  c.setAttribute( "cy", y );
  c.setAttribute( "r", "10" );
  c.setAttribute( "fill", "#B497D6" );
  c.setAttribute( "stroke", "black" );
  pic.appendChild( c );
  dots[c] = 'change';
  c.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    if (dots[c] == 'change') {
      c.setAttribute("fill", "#AEC6CF");
      dots[c] = 'delete';
    } else {
      pic.removeChild(c);
      delete dots[c];
      drawDot(Math.random() * 500, Math.random() * 500);
    }
  });
}

var clear = function() {
  prevX = null;
  prevY = null;
  while (pic.firstChild) { //Deletes all children
    pic.removeChild(pic.firstChild);
  }
}

clearButton.addEventListener('click', clear);
pic.addEventListener('click', function(event) {
  var x = event.offsetX; //Relative x coordinate of the mouse to the canvas
  var y = event.offsetY; //Relative y coordinate of the mouse to the canvas
  event.preventDefault(); //Stops click action from being executed
  drawDot(x,y);
});
