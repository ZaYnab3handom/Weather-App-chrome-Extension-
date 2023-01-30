//alert("Weather APP")

//get current location
var lat
var lon
var failedLoc = document.getElementById("failedlocation");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    failedLoc.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
    lat =  position.coords.latitude 
    lon = position.coords.longitude;
    console.log(lat,lon)

}
window.onload=getLocation

 



//fetch weather api
setTimeout(fetchCall,500)
function fetchCall(){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'8e6f326893ece389b11750bd3310b474'}&units=metric`)

.then(data => data.json())
.then(jsonData => {console.log(jsonData)})}
