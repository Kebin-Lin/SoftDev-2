var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

d3.select(".chart")
  .selectAll("div") //Select all divs under chart
    .data(data) //Bind data
  .enter().append("div") //Enter new data under div tags
    .style('width', function(d) { return scale(d) + 'px'; }) //Scales and sets width
    .text(function(d) { return d; }); //Sets text
