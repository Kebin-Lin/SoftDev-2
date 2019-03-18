// Kevin Lin
// SoftDev2 Pd7
// K11 -- Ask Circles [Change || Die] …While On The Go
// 2019-03-18

//A lot of code was re-used from K02...

var pic = document.getElementById("vimage");
var clearButton = document.getElementById("but_clear");
var moveButton = document.getElementById("move");
var scatterButton = document.getElementById("scatter");
var requestID;
var scatter = false;

var dots = {};

var drawDot = function(x,y,r) {
  if (r / 2 < .5) {
    return;
  }
  var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute( "cx", x );
  c.setAttribute( "cy", y );
  c.setAttribute( "r", r );
  c.setAttribute( "fill", "#B497D6" );
  c.setAttribute( "stroke", "black" );
  c.setAttribute( "dx", '1' );
  c.setAttribute( "dy", '1' );
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
      drawDot(Math.random() * 500, Math.random() * 500, c.getAttribute('r'));
    }
  });
  return c;
}

var moveDots = function() {
  window.cancelAnimationFrame(requestID);
  var moveHelper = function() {
    var toRemove = new Set();
    for (var i = 0; i < pic.children.length; i++) { //Go through all dots
      var currDot = pic.children[i];
      var currRad = parseInt(currDot.getAttribute('r'));
      var newDots = []
      var nextX = parseInt(currDot.getAttribute('cx')) + parseInt(currDot.getAttribute('dx')); //To be the new x position
      var nextY = parseInt(currDot.getAttribute('cy')) + parseInt(currDot.getAttribute('dy'));
      if (nextX > 500 - currRad || nextX < currRad) { //Check if new X is out of bounds
        //console.log(nextX);
        currDot.setAttribute('dx', parseInt(currDot.getAttribute('dx')) * -1) //Negates x velocity
        nextX = parseInt(currDot.getAttribute('cx')) + parseInt(currDot.getAttribute('dx')); //Fixes x position
        //console.log(nextX);
        if (scatter) { //Splits dot if scatter mode is on
          toRemove.add(currDot); //Marks current dot to be removed
          var newDot = drawDot(nextX, nextY, currRad / 2); //Creates new, smaller dot
          if (newDot == null) { //Goes onto next dot if the new dot is too small to split
            continue;
          }
          newDot.setAttribute('dx', parseInt(currDot.getAttribute('dx')) * 2); //Doubles new dot speed
          newDot.setAttribute('dy', parseInt(currDot.getAttribute('dy')) * -2);
          newDots.push(newDot);
          newDot = drawDot(currDot.getAttribute('cx'), currDot.getAttribute('cy'), currRad / 2);
          newDot.setAttribute('dx', parseInt(currDot.getAttribute('dx')) * 2);
          newDot.setAttribute('dy', parseInt(currDot.getAttribute('dy')) * 2); //Second new dot has negated y velocity for splitting effect
          newDots.push(newDot);
        }
      }
      if (nextY > 500 - currRad || nextY < currRad) {
        currDot.setAttribute('dy', parseInt(currDot.getAttribute('dy')) * -1)
        nextY = parseInt(currDot.getAttribute('cy')) + parseInt(currDot.getAttribute('dy'));
        //console.log(nextY);
        //console.log(nextY);
        if (scatter) {
          toRemove.add(currDot);
          if (newDots.length != 0) {
            newDots[0].setAttribute('dx', parseInt(newDots[0].getAttribute('dx')) * -1); //Makes sure new dots are in bounds
            newDots[0].setAttribute('cy', nextY);
            newDots[1].setAttribute('cy', nextY);
          } else {
            var newDot = drawDot(nextX, nextY, currRad / 2);
            if (newDot == null) {
              continue;
            }
            newDot.setAttribute('dx', parseInt(currDot.getAttribute('dx')) * -2);
            newDot.setAttribute('dy', parseInt(currDot.getAttribute('dy')) * 2);
            newDots.push(newDot);
            newDot = drawDot(currDot.getAttribute('cx'), currDot.getAttribute('cy'), currRad / 2);
            newDot.setAttribute('dx', parseInt(currDot.getAttribute('dx')) * 2);
            newDot.setAttribute('dy', parseInt(currDot.getAttribute('dy')) * 2);
            newDots.push(newDot);
          }
        }
      }
      currDot.setAttribute('cx', nextX);
      currDot.setAttribute('cy', nextY);
    }
    toRemove.forEach(function(i) {
      pic.removeChild(i);
    });
    requestID = window.requestAnimationFrame(moveHelper); //Asks for next frame
  }
  moveHelper();
}

var clear = function() {
  prevX = null;
  prevY = null;
  pic.innerHTML = '';
  window.cancelAnimationFrame(requestID);
}

var toggleScatter = function() {
  scatter = !scatter;
}

clearButton.addEventListener('click', clear);
moveButton.addEventListener('click', moveDots);
pic.addEventListener('click', function(event) {
  var x = event.offsetX; //Relative x coordinate of the mouse to the canvas
  var y = event.offsetY; //Relative y coordinate of the mouse to the canvas
  event.preventDefault(); //Stops click action from being executed
  drawDot(x,y,20);
});
scatterButton.addEventListener('click', toggleScatter);
