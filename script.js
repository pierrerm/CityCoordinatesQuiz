/* If you're feeling fancy you can add interactivity 
   to your site with Javascript */

var index;

function startQuiz() {
  var elem = document.getElementById('startBtn');
  elem.parentNode.removeChild(elem);
  addCityQuestion();
  return false;
}

function addCityQuestion(){
  var citiesJson = $.getJSON(
    "https://cdn.glitch.com/138c3ef8-a9f5-4f67-bcb8-162413e4f03c%2Fcities.json?v=1583211298978",
    function(citiesJson){
      console.log("Json file loaded: " + citiesJson.Cities.length + " entries.");
      var questionDiv = document.getElementById('questionDiv');
      index = Math.floor((Math.random() * citiesJson.Cities.length));
      var para = document.createElement("P");
      para.innerText = "Where is " + citiesJson.Cities[index].city + " located?";
      questionDiv.appendChild(para); 
      var continentSelect = document.getElementById('continent');
      var continents = ["Africa", "Asia", "Europe", "Oceania", "North America", "South America"];
      for (var continent in continents){
        var opt = document.createElement('option');
        opt.value = continents[continent];
        opt.innerHTML = continents[continent];
        continentSelect.appendChild(opt);
      }
      var answerDiv = document.getElementById('answerDiv');
      answerDiv.style.display = "block";
    }
  );
}

function updateLatitude(){
  var slider = document.getElementById("latitude");
  var value = document.getElementById("latitudeValue");
  value.innerHTML = "Choose a latitude: 0slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    output.innerHTML = this.value;
  }
}