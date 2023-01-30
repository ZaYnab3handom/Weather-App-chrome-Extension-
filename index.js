//alert("Weather APP")
var _date = new Date()
var curHr = _date.getHours()
var welocmeMess = document.getElementById("good")

if (curHr < 12) {
  welocmeMess.innerHTML= "Good Morning"
} else if (curHr < 18) {
  welocmeMess.innerHTML= "Good Afternoon"

} else {
  welocmeMess.innerHTML= "Good Evening"
}

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
setTimeout(fetchCall,200)
function fetchCall(){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'8e6f326893ece389b11750bd3310b474'}&units=metric`)

.then(data => data.json())
.then(jsonData => {
  console.log(jsonData)
  setData(jsonData)})
}
var userInputCity = document.getElementById('usrcity')
userInputCity.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInputCity.value}&appid=${'8e6f326893ece389b11750bd3310b474'}&units=metric`)
    .then(data => data.json())
    .then(jsonData => {
    console.log(jsonData)
    setData(jsonData)})
    
  }
});

//set Data at html
function setData(reData){
  if(reData.cod == "404"){
   document.getElementById("usererro").style.visibility="visible"
  }
  else{
   document.getElementById('city').innerHTML =  reData.name +','+reData.sys.country 
  document.getElementById('temp').innerHTML = Math.floor(reData.main.temp) +"°C"
  document.getElementById('hum').style.visibility ="visible"
  document.getElementById('humidity').innerHTML =  reData.main.humidity +"%"
  document.getElementById('state').innerHTML = reData.weather[0].main
  //document.getElementById('statImg').innerHTML = reData.weather[0].icon
  document.getElementById('win').style.visibility ="visible"
  document.getElementById('wind').innerHTML = reData.wind.speed +" Km/h"

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').innerHTML =_date.toLocaleDateString('en-GB', options);
  document.getElementById('time').innerHTML =_date.toLocaleTimeString();

  document.getElementById('footer').style.visibility ="visible"
  document.getElementById("usererro").style.visibility="hidden"

}
}
