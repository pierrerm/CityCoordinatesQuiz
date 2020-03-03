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
      var div = document.getElementById('questionDiv');
      index = Math.floor((Math.random() * citiesJson.Cities.length));
      var para = document.createElement("P");
      para.innerText = "Where is " + citiesJson.Cities[index].city + " located?";
      div.appendChild(para); 
    }
  );
}
