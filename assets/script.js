var srchBtn = document.querySelector("#searchButton");
var todayEl = document.querySelector("#todayWeather");

//API call to openweather given the lat and long of the entered city. runs displayWeather function with API return object.
var getWeatherData = function (lat, long, city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&units=imperial" +
    "&appid=dd0131dd813be694ba34a4c045ffbbfc";
  console.log(apiUrl);

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayTodayWeather(data, city);
        displayFiveDay(data);
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//update html and css with weather data for the given city at the current time and date.
var displayTodayWeather = function (fetchResults, city) {
  todayEl.textContent = "";

  var displayCity = document.createElement("h2");
  displayCity.textContent = city + " " + moment().format("(M/D/Y)");
  todayEl.appendChild(displayCity);

  var todayTemp = fetchResults.current.temp;
  var displayTodayTemp = document.createElement("h4");
  displayTodayTemp.textContent = "Temp: " + todayTemp + "F";
  todayEl.appendChild(displayTodayTemp);

  var todayWind = fetchResults.current.wind_speed;
  var displayTodayWind = document.createElement("h4");
  displayTodayWind.textContent = "Wind Speed: " + todayWind + " MPH";
  todayEl.appendChild(displayTodayWind);

  var todayHum = fetchResults.current.humidity;
  var displayTodayHum = document.createElement("h4");
  displayTodayHum.textContent = "Humidity: " + todayHum + "%";
  todayEl.appendChild(displayTodayHum);

  var todayUVI = fetchResults.current.uvi;
  var displayTodayUVI = document.createElement("h4");
  displayTodayUVI.textContent = "UV Index: " + todayUVI;
  todayEl.appendChild(displayTodayUVI);
};

//Fill the 5-day forecast cards with weather data over the next five days.
var displayFiveDay = function (fetchResults) {
  startdate = moment().format("(M/D/Y)");
  for (var i = 1; i < 6; i++) {
    var dayCard = document.getElementById("day" + i);
    dayCard.textContent = "";
  }
  for (var i = 1; i < 6; i++) {
    var new_date = moment(startdate, "(M/D/Y)").add(i, "days");
    var day = new_date.format("D/");
    var month = new_date.format("M/");
    var year = new_date.format("Y");

    var dayCard = document.getElementById("day" + i);
    var displayDate = document.createElement("h4");
    displayDate.textContent = month + day + year;
    dayCard.appendChild(displayDate);

    var todayTemp = fetchResults.daily[i].temp.day;
    var displayTodayTemp = document.createElement("h5");
    displayTodayTemp.textContent = "Temp: " + todayTemp + "F";
    dayCard.appendChild(displayTodayTemp);

    var todayWind = fetchResults.daily[i].wind_speed;
    var displayTodayWind = document.createElement("h5");
    displayTodayWind.textContent = "Wind Speed: " + todayWind + " MPH";
    dayCard.appendChild(displayTodayWind);

    var todayHUM = fetchResults.daily[i].humidity;
    var displayTodayHUM = document.createElement("h5");
    displayTodayHUM.textContent = "Humidity: " + todayHUM + "%";
    dayCard.appendChild(displayTodayHUM);
  }
};

//google maps api geocoder to get latitude and longitude for the given city on search button click. runs the getWeatherData function with the generated lat and long.
$("#searchButton").click(function () {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById("citySearch").value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var lat = results[0].geometry.location.lat();
      var long = results[0].geometry.location.lng();
      var city = results[0].formatted_address;
      lat = Math.round(lat);
      long = Math.round(long);
      getWeatherData(lat, long, city);
    } else {
      alert("Something is wrong " + status);
    }
  });
});
