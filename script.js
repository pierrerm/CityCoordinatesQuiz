/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

function startQuiz() {
  var json = $.getJSON(
    "https://cdn.glitch.com/138c3ef8-a9f5-4f67-bcb8-162413e4f03c%2Fcities.json?v=1583211298978",
    updatePage
  );
}

function updatePage(json) {
  var elem = document.getElementById('startBtn');
  elem.parentNode.removeChild(elem);
  var div = document.getElementById('questionDiv');
  var index = Math.floor((Math.random() * json.Cities.length));
  var para = document.createElement("P");
  para.innerText = "Where is " + json.Cities[index].city + " located?";
  div.appendChild(para);     
  return false;
}