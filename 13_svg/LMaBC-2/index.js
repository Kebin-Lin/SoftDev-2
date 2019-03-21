var width = 420,
    barHeight = 20;

var x = d3.scaleLinear().range([0,width]);

var chart = d3.select(".chart") //Set chart width
    .attr("width", width)

d3.tsv("data.tsv").then( function(data) {//data.tsv needs to be on a web server

  x.domain([0, d3.max(data, function(d) { return parseInt(d.value); })])//Goes through value column

  chart.attr("height", barHeight * data.length); //Set chart height

  var bar = chart.selectAll("g") //Selects all groups in svg
      .data(data) //Bind data
    .enter().append("g") //New group per data point
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; }); //Reposition group to avoid bar overlapping

  bar.append("rect") //Add rectangle to every group
      .attr("width", function(d) { return x(d.value); }) //Set width based on the scale function and the data associated with the group
      .attr("height", barHeight - 1);

  bar.append("text") //Add text to every group
      .attr("x", function(d) { return x(d.value) - 3; }) //Set text x position relative to group
      .attr("y", barHeight / 2) //Set text y position relative to group
      .attr("dy", ".35em") //Shift text down by 35% of its height
      .text(function(d) { return d.value; });
});
