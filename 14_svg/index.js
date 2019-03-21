d3.selectAll("section").append("p"); //Appends a <p> child to every <section>

d3.select("section").append("aside"); //Only first gets aside

console.log(d3.selectAll("section").select("aside")); //Four elements, three are empty to preserve indexing

d3.select("body").select(".oneval").append("h1").datum(42); //Adds h1 to .oneval in body, binds 42

d3.csv('data.csv').then(function(data) {
  var table = d3.select(".byind");
  console.log(table);
  var rows = table.selectAll('tr')
    .data(data) //Bind data
    .enter().append('tr')

  rows.append('td')
    .text(function(d) { return d.first; });

  rows.append('td')
    .text(function(d) { return d.value; });
});
