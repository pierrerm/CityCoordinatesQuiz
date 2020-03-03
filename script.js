/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

$.getJSON( "https://cdn.glitch.com/138c3ef8-a9f5-4f67-bcb8-162413e4f03c%2Fcities.json?v=1583211298978", function( json ) {
    console.log( "JSON Data received, name is " + json.Cities[0].city);
});

function startQuiz() {
    var elem = document.getElementById('startBtn');
    elem.parentNode.removeChild(elem);
    return false;
}