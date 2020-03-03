/* If you're feeling fancy you can add interactivity 
   to your site with Javascript */

var citiesJson;
var city;

function startQuiz() {
  var elem = document.getElementById('startBtn');
  elem.parentNode.removeChild(elem);
  citiesJson = require("./cities.json");
  addCityQuestion();
  return false;
}

function addCityQuestion(){
  var div = document.getElementById('questionDiv');
  var index = Math.floor((Math.random() * citiesJson.Cities.length));
  var para = document.createElement("P");
  para.innerText = "Where is " + citiesJson.Cities[index].city + " located?";
  div.appendChild(para); 
}
