// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBTvC_Yyzs1B435EvQcLLuVBQOZgEO3zDM",
  authDomain: "events-happening-16560.firebaseapp.com",
  databaseURL: "https://events-happening-16560.firebaseio.com",
  projectId: "events-happening-16560",
  storageBucket: "",
  messagingSenderId: "505583586650",
  appId: "1:505583586650:web:9e6f9b8d36ae7ee7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//====================Kris's Section======================//
//Events API
var interests;
var budget;
var time;
var age;
var userLocation;

function urlBuilder() {

  var queryURL = "https://www.eventbriteapi.com/v3/events/search/?";
  var locationString = "location.address=" + userLocation + "&location.within=10km";
  console.log(locationString)
  if (userLocation !== undefined) {
    queryURL += locationString
  }
  console.log(queryURL);

  // var categoriesString = "&categories=" + MyObject[interests]  // This is if you make you object global and populate it on startup
  var categoriesString = "&categories=" + interests;  // Change this so it can add the ID instead of name when it's defined
  if (interests !== "") {
    queryURL += categoriesString
    // Get the categories
    var cat_url = "https://www.eventbriteapi.com/v3/categories/?token=D5NQE7TMJX4PHIHKIRHQ"
    $.ajax({
      url: cat_url,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        for (i = 0; i < response.categories.length; i++) {


          console.log(response.categories[i].name);
        }
        // Log the queryURL
        console.log(cat_url);

        // Build an object with the names and id. Use a FOR loop over the catergory array

        // Log the resulting object
        console.log(response);
      });
    console.log('added categories')
  }
  console.log(queryURL);


  var budgetString = "&price=" + budget;
  console.log(typeof (budget));
  if (budget !== "") {
    queryURL += budgetString
    console.log('added budget')
  }
  console.log(queryURL);

  var startDateString = "&start_date.keyword=" + time;
  console.log(typeof (time));
  if (time !== "") {
    queryURL += startDateString
    console.log('added start date')
  }
  console.log(queryURL);

  var ageString = "&include_adult_events=on";
  if (age >= 21) {
    queryURL += ageString
    console.log('added age')
  }
  console.log(queryURL)

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": queryURL,
    "method": "GET",
    "headers": {
      "Authorization": "Bearer D5NQE7TMJX4PHIHKIRHQ",
      // "Content-Type": "application/json"
    }
  }
  return settings
}



//====================Kris End============================//
//Maps API
// Instantiate a map and platform object:
function mapsApi() {
  var platform = new H.service.Platform({
    'apikey': 'kYg1ZabnHl6tuIke8C9aSCH_oGt3itG_QM5DaCl5Abg'
  });
  // Retrieve the target element for the map:
  var targetElement = document.getElementById('mapContainer');

  // Get the default map types from the platform object:
  var defaultLayers = platform.createDefaultLayers();

  // Instantiate the map:
  var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: { lat: 40.7607793, lng: -111.8910474 }
    });
  // Create the parameters for the routing request:
  var routingParameters = {
    // The routing mode:
    'mode': 'fastest;car',
    // The start point of the route:
    'waypoint0': 'geo!50.1120423728813,8.68340740740811',
    // The end point of the route:
    'waypoint1': 'geo!52.5309916298853,13.3846220493377',
    // To retrieve the shape of the route we choose the route
    // representation mode 'display'
    'representation': 'display'
  };

  // Define a callback function to process the routing response:
  var onResult = function (result) {
    var route,
      routeShape,
      startPoint,
      endPoint,
      linestring;
    if (result.response.route) {
      // Pick the first route from the response:
      route = result.response.route[0];
      // Pick the route's shape:
      routeShape = route.shape;

      // Create a linestring to use as a point source for the route line
      linestring = new H.geo.LineString();

      // Push all the points in the shape into the linestring:
      routeShape.forEach(function (point) {
        var parts = point.split(',');
        linestring.pushLatLngAlt(parts[0], parts[1]);
      });

      // Retrieve the mapped positions of the requested waypoints:
      startPoint = route.waypoint[0].mappedPosition;
      endPoint = route.waypoint[1].mappedPosition;

      // Create a polyline to display the route:
      var routeLine = new H.map.Polyline(linestring, {
        style: { strokeColor: 'blue', lineWidth: 3 }
      });

      // Create a marker for the start point:
      var startMarker = new H.map.Marker({
        lat: startPoint.latitude,
        lng: startPoint.longitude
      });

      // Create a marker for the end point:
      var endMarker = new H.map.Marker({
        lat: endPoint.latitude,
        lng: endPoint.longitude
      });

      // Add the route polyline and the two markers to the map:
      map.addObjects([routeLine, startMarker, endMarker]);

      // Set the map's viewport to make the whole route visible:
      map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
    }
  };

  // Get an instance of the routing service:
  var router = platform.getRoutingService();

  // Call calculateRoute() with the routing parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  router.calculateRoute(routingParameters, onResult,
    function (error) {
      alert(error.message);
    });
}



//====================Jaron's Section=====================//
//Weather API
// This is our API key
function weatherApi() {
  var APIKey = "166a433c57516f51dfab1f7edaed8413";

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + userLocation + ",Burundi&units=imperial&appid=" + APIKey;
  return queryURL;
}


//====================Jaron End===========================//
//====================Dallin's Section====================//





//====================Dallin End==========================//
//====================Emily's Section=====================//

var interestsArray = [];


$("#submit-button").on("click", function (event) {
  event.preventDefault();

  // Capture User Inputs and store them into variables

  interests = $("#interest-input").val().split(" ").join("+");
  budget = $("#budget-input").val().split(" ").join("+");
  time = $("#time-input").val().split(" ").join("+");
  age = $("#age-input").val().split(" ").join("+");
  userLocation = $("#location-input").val().split(" ").join("+");

  var event_brite_settings = urlBuilder()
  var weather_url = weatherApi()

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: weather_url,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(weather_url);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city").html(response.name + " Weather Details");
      $(".weather").text("Weather: " + response.weather[0].description);
      // $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + response.main.temp);

      // Log the data in the console as well
      console.log("weather: " + response.weather);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });

  $.ajax(event_brite_settings)
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(event_brite_settings.url);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      // $(".weather").text("Weather: " + response.weather[0].description);
      // $(".humidity").text("Humidity: " + response.main.humidity);
      // $(".temp").text("Temperature (F) " + response.main.temp);

      // // Log the data in the console as well
      // console.log("weather: " + response.weather);
      // console.log("Humidity: " + response.main.humidity);
      // console.log("Temperature (F): " + response.main.temp);
    });





  console.log(event_brite_settings)
  console.log(weather_url)

  // Console log each of the user inputs to confirm we are receiving them correctly
  console.log(interests);
  console.log(budget);
  console.log(time);
  console.log(age);
  console.log(userLocation);


  localStorage.setItem("interest-input", interests);
  localStorage.setItem("budget-input", budget);
  localStorage.setItem("time-input", time);
  localStorage.setItem("age-input", age);
  localStorage.setItem("location-input", userLocation);


  interestsArray.push(interests);
  localStorage.setItem('interest-input', JSON.stringify(interestsArray))
});



//====================Emily End===========================//