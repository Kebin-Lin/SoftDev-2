//Kevin Lin
//SoftDev2 pd7
//K15 -- Scattered... or: Smothered, Covered, Chunked, Diced, Peppered, Capped, Topped & Country
//2019-03-22

var width = 500,
    height = 500;
//var filename = 'circle.csv'; //https://github.com/mks66/66source/tree/master/polygons/base_python
//var filename = 'data.csv';
var filename = 'moore.csv'; //https://github.com/wallento/mooreandmore/blob/master/raw_data.csv
var padding = 100;
//var precision = 10;

var xscale = d3.scaleLinear().range([padding,width - padding]);
var yscale = d3.scaleLinear().range([height - padding,padding]);

var dotrad = 2;

var chart = d3.select(".chart") //Set chart width
    .attr("width", width)
    .attr('height', 500);

d3.csv(filename).then( function(data) {

  var maxX = d3.max(data, function(d) { return parseInt(d.x - 1970); }); //Years since 1970
  var maxY = d3.max(data, function(d) { return parseInt(d.y / 1000000); });

  xscale.domain([0, maxX]); //Sets domain for x coords
  yscale.domain([0, maxY]); //Sets domain for y coords

  var dot = chart.selectAll("g") //Selects all groups in svg
      .data(data) //Bind data
    .enter().append("g") //New group per data point

  dot.append('circle')
    .attr('cx', function(d) { return xscale(d.x - 1970); }) //Sets x center of dot
    .attr('cy', function(d) { return yscale(d.y / 1000000); }) //Sets y center of dot
    .attr('r', dotrad); //Sets dot radius

  dot.append('text')
    .attr('x', function(d) { return xscale(d.x - 1970) + dotrad + 3 })
    .attr('y', function(d) { return yscale(d.y / 1000000) })
    .attr("dy", ".35em") //Shift text down by 35% of its height
    .text(function(d) { return d.name });

  var axisX = d3.axisBottom().scale(xscale);
  var axisY = d3.axisLeft().scale(yscale);

  chart.append('text') //Title
    .attr('x', width/2)
    .attr('y', padding - 10)
    .attr('text-anchor','middle')
    .style('font-size', '20px')
    .text("Moore's Law");

    chart.append('text') //x-axis label
      .attr('x', width/2)
      .attr('y', height - padding + 40)
      .attr('text-anchor','middle')
      .style('font-size', '14px')
      .text("Years Since 1970");

    chart.append('text') //y-axis label
      .attr('transform', "rotate(-90)")
      .attr('x', -height/2)
      .attr('y', padding - 40)
      .attr('text-anchor','middle')
      .style('font-size', '14px')
      .text("Millions of Transistors");

  chart.append('g')
    .attr('transform', 'translate(0, ' + (height - padding) + ')')
    .call(axisX);

  chart.append('g')
    .attr("transform", "translate(" + padding + ", 0)")
    .call(axisY);

  // chart.append('line') //x-axis
  //   .attr('x1', padding)
  //   .attr('y1', height - padding)
  //   .attr('x2', width - padding + 10)
  //   .attr('y2', height - padding)
  //   .attr('stroke', "#000000");
  //
  // chart.append('line') //y-axis
  //   .attr('x1', padding)
  //   .attr('y1', height - padding)
  //   .attr('x2', padding)
  //   .attr('y2', padding - 10)
  //   .attr('stroke', "#000000");
  //
  // for (var i = 1; i < precision + 1; i++) {
  //   var displacementy = i * ((height - 2 * padding) / precision);
  //   var displacementx = i * ((width - 2 * padding) / precision);
  //   var incx = maxX * i / precision;
  //   var incy = maxY * i / precision;
  //
  //   var xtick = chart.append('g') //x-axis tick
  //   var ytick = chart.append('g') //y-axis tick
  //
  //   xtick.append('line') //Tick
  //     .attr('x1', padding + displacementx)
  //     .attr('y1', height - padding - 2)
  //     .attr('x2', padding + displacementx)
  //     .attr('y2', height - padding + 2)
  //     .attr('stroke', "#000000");
  //
  //   xtick.append('text') //Text label
  //     .attr('class', 'xtick')
  //     .attr('dy', '1em')
  //     .attr('x', padding + displacementx)
  //     .attr('y', height - padding + 2)
  //     .text(incx);
  //
  //   ytick.append('line') //Tick
  //     .attr('x1', padding - 2)
  //     .attr('y1', height -padding - displacementy)
  //     .attr('x2', padding + 2)
  //     .attr('y2', height - padding - displacementy)
  //     .attr('stroke', "#000000");
  //
  //   ytick.append('text') //Text label
  //     .attr('class', 'ytick')
  //     .attr('x', padding - 4)
  //     .attr('dy', '.35em')
  //     .attr('y', height - padding - displacementy)
  //     .text(incy);
  // }
});
