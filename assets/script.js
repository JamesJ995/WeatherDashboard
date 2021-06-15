var srchBtn = document.querySelector("#searchButton");

//API call to openweather given the lat and long of the entered city. runs displayWeather function with API return object.
var getWeatherData = function (lat, long) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=dd0131dd813be694ba34a4c045ffbbfc";
  console.log(apiUrl);

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data);
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//update html and css with weather data.
var displayWeather = function (fetchResults) {};

//google maps api geocoder to get latitude and longitude for the given city on search button click. runs the getWeatherData function with the generated lat and long.
$("#searchButton").click(function () {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById("citySearch").value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var lat = results[0].geometry.location.lat();
      var long = results[0].geometry.location.lng();
      lat = Math.round(lat);
      long = Math.round(long);
      getWeatherData(lat, long);
    } else {
      alert("Something is wrong " + status);
    }
  });
});
