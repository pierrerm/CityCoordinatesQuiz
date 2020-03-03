/* If you're feeling fancy you can add interactivity 
   to your site with Javascript */

var index;

function startQuiz() {
  var elem = document.getElementById('startBtn');
  if (elem != undefined) elem.parentNode.removeChild(elem);
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
      var para = document.getElementById("question") || document.createElement("question");
      para.innerText = "Where is " + citiesJson.Cities[index].city + " located?";
      if (questionDiv.querySelector("question") == null) questionDiv.appendChild(para);
      var continentSelect = document.getElementById('continent');
      if (continentSelect.children.length < 6){
        var continents = ["Africa", "Asia", "Europe", "Oceania", "North America", "South America"];
        for (var continent in continents){
          var opt = document.createElement('option');
          opt.id = continents[continent];
          opt.value = continents[continent];
          opt.innerHTML = continents[continent];
          continentSelect.appendChild(opt);
        }
      }
      var answerDiv = document.getElementById('answerDiv');
      answerDiv.style.display = "block";
    }
  );
}

function updateSliderValue(key){
  var slider = document.getElementById(key);
  var value = document.getElementById(key + "Value");
  value.innerHTML = "Choose a " + key + ": " + slider.value;
}

function checkAnswer(){
  var citiesJson = $.getJSON(
    "https://cdn.glitch.com/138c3ef8-a9f5-4f67-bcb8-162413e4f03c%2Fcities.json?v=1583211298978",
    function(citiesJson){
      document.getElementById("continentResult").innerHTML = "Actual continent: " + citiesJson.Cities[index].continent;
      document.getElementById("countryResult").innerHTML = "Actual country: " + citiesJson.Cities[index].country;
      
      var latitudeSlider = document.getElementById("latitudeResult");
      var latitudeValue = document.getElementById("latitudeResultValue");
      latitudeSlider.value = citiesJson.Cities[index].latitude;
      latitudeValue.innerHTML = "Actual latitude: " + citiesJson.Cities[index].latitude;
      
      var longitudeSlider = document.getElementById("longitudeResult");
      var longitudeValue = document.getElementById("longitudeResultValue");
      longitudeSlider.value = citiesJson.Cities[index].longitude;
      longitudeValue.innerHTML = "Actual longitude: " + citiesJson.Cities[index].longitude;
      
      var resultDiv = document.getElementById('resultDiv');
      resultDiv.style.display = "block";
    }
  );
}

function replayQuiz(){
  document.getElementById('Africa').selected = "selected";
  document.getElementById('country').value = "";
  document.getElementById('latitude').value = 0;
  document.getElementById('latitudeValue').innerHTML = "Choose a latitude: 0";
  document.getElementById('longitude').value = 0;
  document.getElementById('latitudeValue').innerHTML = "Choose a longitude: 0";
  var resultDiv = document.getElementById('resultDiv');
      resultDiv.style.display = "none";
  startQuiz();
}