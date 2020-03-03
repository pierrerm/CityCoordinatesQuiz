/* If you're feeling fancy you can add interactivity 
   to your site with Javascript */

var index;
var round=0;
var totalScore=0;

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
      round++;
      console.log("round: " + round);
      var questionDiv = document.getElementById('questionDiv');
      index = Math.floor((Math.random() * citiesJson.Cities.length));
      var para = document.getElementById("question") || document.createElement("P");
      para.id = "question";
      para.innerText = "Where is " + citiesJson.Cities[index].city + " located?";
      console.log(para.innerText);
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
      var continentSelect = document.getElementById("continent");
      var answerContinent = continentSelect.options[continentSelect.selectedIndex].value;
      var answerCountry = document.getElementById("country").value;
      var answerLatitude = document.getElementById("latitude").value;
      var answerLongitude = document.getElementById("longitude").value;
      
      var resultContinent = citiesJson.Cities[index].continent;
      var resultCountry = citiesJson.Cities[index].country;
      var resultLatitude = citiesJson.Cities[index].latitude;
      var resultLongitude = citiesJson.Cities[index].longitude;
      
      var latitudeDifference = Math.round(Math.abs(answerLatitude - resultLatitude));
      var longitudeDifference = Math.round(Math.abs(answerLongitude - resultLongitude));
      var score = 30 * (answerContinent == resultContinent ? 1 : 0) + 30 * (answerCountry == resultCountry ? 1 : 0);
      score +=  20 - (latitudeDifference > 20 ? 20 : latitudeDifference);
      score +=  20 - (longitudeDifference > 20 ? 20 : longitudeDifference);
      
      totalScore += score;
      
      document.getElementById("roundScore").innerHTML = "Score: " + score;
      document.getElementById("totalScore").innerHTML = "Total Score: " + totalScore;
      
      document.getElementById("continentResult").innerHTML = "Actual continent: " + resultContinent;
      document.getElementById("countryResult").innerHTML = "Actual country: " + resultCountry;
      
      var latitudeSlider = document.getElementById("latitudeResult");
      var latitudeValue = document.getElementById("latitudeResultValue");
      latitudeSlider.value = resultLatitude;
      latitudeValue.innerHTML = "Actual latitude: " + resultLatitude;
      
      var longitudeSlider = document.getElementById("longitudeResult");
      var longitudeValue = document.getElementById("longitudeResultValue");
      longitudeSlider.value = resultLongitude;
      longitudeValue.innerHTML = "Actual longitude: " + resultLongitude;
      
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
  document.getElementById('longitudeValue').innerHTML = "Choose a longitude: 0";
  var resultDiv = document.getElementById('resultDiv');
      resultDiv.style.display = "none";
  startQuiz();
}