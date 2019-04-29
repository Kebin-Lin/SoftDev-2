//Kevin Lin
//SoftDev2 pd7
//K21 -- Onions, Bell Peppers, and Celery, Oh My!  JS and the Holy Trinity
//2019-04-30

var data = $.getJSON('https://data.cityofnewyork.us/resource/ihfw-zy9j.json', function(data) {
  //Average percentage of asians
  var result1 = data.reduce(function(a,b) {return a + parseFloat(b['asian_per']);}, 0) / data.length;
  document.getElementById('result1').innerHTML = document.getElementById('result1').innerHTML + result1.toString() + '%';
  //Average percentage of blacks
  var result2 = data.reduce(function(a,b) {return a + parseFloat(b['black_per']);}, 0) / data.length;
  document.getElementById('result2').innerHTML = document.getElementById('result2').innerHTML + result2.toString() + '%';
  //Average percantage of black students in white dominated schools
  var keyLst = ['asian_per', 'black_per', 'hispanic_per'];
  var whiteDominatedSchools = data.filter(function(a) {
    var percWhite = parseFloat(a['white_per']);
    for (var i = 0; i < 3; i++) {
      if (parseFloat(a[keyLst[i]]) > percWhite) { //Returns false if any other race has a greater percentage than whites
        return false;
      }
    }
    return true; //Returns true otherwise
  });
  var result3 = whiteDominatedSchools.reduce(function(a,b) {return a + parseFloat(b['black_per']);}, 0) / whiteDominatedSchools.length;
  document.getElementById('result3').innerHTML = document.getElementById('result3').innerHTML + result3.toString() + '%';
});
