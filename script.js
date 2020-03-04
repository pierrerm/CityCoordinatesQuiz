/* If you're feeling fancy you can add interactivity 
   to your site with Javascript */

var index;
var round = 0;
var totalScore = 0;
var skips = 3;
var gamemode = "Capitals";

function updateGamemode() {
  if (document.getElementById("gamemodeBtn").checked) {
    gamemode = "Cities"
  } else {
    gamemode = "Capitals"
  }
}

function startQuiz() {
  var gamemodeDiv = document.getElementById("gamemodeDiv");
  if (gamemodeDiv != undefined) gamemodeDiv.parentNode.removeChild(gamemodeDiv);
  var startBtn = document.getElementById("startBtn");
  if (startBtn != undefined) startBtn.parentNode.removeChild(startBtn);
  addCityQuestion();
  return false;
}

function addCityQuestion() {
  var citiesJson = $.getJSON(
    "https://cdn.glitch.com/138c3ef8-a9f5-4f67-bcb8-162413e4f03c%2Fcities.json?v=1583211298978",
    function(citiesJson) {
      console.log(gamemode);
      console.log(
        "Json file loaded: " + citiesJson[gamemode].length + " entries."
      );
      round++;
      console.log("round: " + round);
      document.getElementById("roundNumber").innerHTML =
        "Round " + round + "/10";
      var questionDiv = document.getElementById("questionDiv");
      questionDiv.style.display = "block";
      index = Math.floor(Math.random() * citiesJson[gamemode].length);
      var para =
        document.getElementById("question") || document.createElement("P");
      para.id = "question";
      para.innerText =
        "Where is " + citiesJson[gamemode][index].city + " located?";
      console.log(para.innerText);
      if (questionDiv.querySelector("question") == null)
        questionDiv.appendChild(para);
      var continentSelect = document.getElementById("continent");
      if (continentSelect.children.length < 6) {
        var continents = [
          "Africa",
          "Asia",
          "Europe",
          "Oceania",
          "North America",
          "South America"
        ];
        for (var continent in continents) {
          var opt = document.createElement("option");
          opt.id = continents[continent];
          opt.value = continents[continent];
          opt.innerHTML = continents[continent];
          continentSelect.appendChild(opt);
        }
      }
      var answerDiv = document.getElementById("answerDiv");
      answerDiv.style.display = "block";
    }
  );
}

function updateSliderValue(key) {
  var slider = document.getElementById(key);
  var value = document.getElementById(key + "Value");
  value.innerHTML = "Choose a " + key + ": " + slider.value;
}

function checkAnswer() {
  var citiesJson = $.getJSON(
    "https://cdn.glitch.com/138c3ef8-a9f5-4f67-bcb8-162413e4f03c%2Fcities.json?v=1583211298978",
    function(citiesJson) {
      if (round > 9) {
        document.getElementById("nextButton").innerHTML = "Finish";
      }
      var continentSelect = document.getElementById("continent");
      var answerContinent =
        continentSelect.options[continentSelect.selectedIndex].value;
      var answerCountry = document.getElementById("country").value;
      var answerLatitude = document.getElementById("latitude").value;
      var answerLongitude = document.getElementById("longitude").value;

      var resultContinent = citiesJson[gamemode][index].continent;
      var resultCountry = citiesJson[gamemode][index].country;
      var resultLatitude = citiesJson[gamemode][index].latitude;
      var resultLongitude = citiesJson[gamemode][index].longitude;

      var latitudeDifference = Math.round(
        Math.pow(Math.abs(answerLatitude - resultLatitude), 2) / 25.3125
      );
      var longitudeDifference = Math.round(
        Math.pow(Math.abs(answerLongitude - resultLongitude), 2) / 101.25
      );
      var score =
        30 * (answerContinent == resultContinent ? 1 : 0) +
        30 * (answerCountry == resultCountry ? 1 : 0);
      score += 20 - (latitudeDifference > 20 ? 20 : latitudeDifference);
      score += 20 - (longitudeDifference > 20 ? 20 : longitudeDifference);

      totalScore += score;

      document.getElementById("roundScore").innerHTML = "Score: " + score;
      document.getElementById("scoreBar").style.width = score + "%";
      document.getElementById("totalScore").innerHTML =
        "Total Score: " + totalScore;

      document.getElementById("continentResult").innerHTML =
        "Actual continent: " + resultContinent;
      document.getElementById("countryResult").innerHTML =
        "Actual country: " + resultCountry;

      var latitudeSlider = document.getElementById("latitudeResult");
      var latitudeValue = document.getElementById("latitudeResultValue");
      latitudeSlider.value = resultLatitude;
      latitudeValue.innerHTML = "Actual latitude: " + resultLatitude;

      var longitudeSlider = document.getElementById("longitudeResult");
      var longitudeValue = document.getElementById("longitudeResultValue");
      longitudeSlider.value = resultLongitude;
      longitudeValue.innerHTML = "Actual longitude: " + resultLongitude;

      var resultDiv = document.getElementById("resultDiv");
      resultDiv.style.display = "block";
    }
  );
}

function nextQuestion() {
  if (round > 9) finishQuiz();
  else {
    document.getElementById("Africa").selected = "selected";
    document.getElementById("country").value = "";
    document.getElementById("latitude").value = 0;
    document.getElementById("latitudeValue").innerHTML = "Choose a latitude: 0";
    document.getElementById("longitude").value = 0;
    document.getElementById("longitudeValue").innerHTML =
      "Choose a longitude: 0";
    document.getElementById("resultDiv").style.display = "none";
    startQuiz();
  }
}

function finishQuiz() {
  document.getElementById("resultDiv").style.display = "none";
  document.getElementById("answerDiv").style.display = "none";
  document.getElementById("questionDiv").style.display = "none";
  document.getElementById("finalScoreDiv").style.display = "block";
  document.getElementById("finalScore").innerHTML =
    "You scored " + totalScore + " points!";
  document.getElementById("finalScoreBarContent").style.width =
    Math.round((totalScore / 1000) * 100) + "%";
}

function skipRound() {
  if (skips > 0) {
    skips--;
    document.getElementById("skipRound").innerHTML = "Skip Round " + skips + "/3";
    round--;
    nextQuestion();
  } else {
    alert("No more skips remaining!");
  }
}
