
// Wrap every letter in a span
$('.ml9 .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: true})
  .add({
    targets: '.ml9 .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: function(el, i) {
      return 45 * (i+1)
    }
  }).add({
    targets: '.ml9',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

var x = document.getElementById("init"), lat, lon, cel, flag = true;

function getLoc() { 
  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(showLoc);
  else
    x.innerHTML = "Couldn't retrieve current postion";
}

function showLoc(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  getWeather();
}

function getWeather() {
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon, function(response) {
    cel = response.main.temp+"&#8451";
 x.innerHTML += "<br>Current Temperature at <span id=\"city\">"+response.name+"</span> <br><span id=\"chTemp\">"+cel+"</span><br> with " +response.weather[0].description;
    document.getElementById("imag").innerHTML = "<img src="+response.weather[0].icon+" alt=\"Smiley face\" height=\"200\" width=\"200\">";
});
}
function temp() {
  if(flag)
    {
      var temp = parseInt(cel)*1.8 + 32;
      document.getElementById("chTemp").innerHTML = temp+"&#8457";
      flag = false;
    }
 else
   {
     document.getElementById("chTemp").innerHTML = cel;
     flag = true;
   }
    
}