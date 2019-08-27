//====================Kris End============================//
//Maps API
// Instantiate a map and platform object:
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
var onResult = function(result) {
  var route,
  routeShape,
  startPoint,
  endPoint,
  linestring;
  if(result.response.route) {
  // Pick the first route from the response:
  route = result.response.route[0];
  // Pick the route's shape:
  routeShape = route.shape;

  // Create a linestring to use as a point source for the route line
  linestring = new H.geo.LineString();

  // Push all the points in the shape into the linestring:
  routeShape.forEach(function(point) {
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
  map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
  }
};

// Get an instance of the routing service:
var router = platform.getRoutingService();

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult,
  function(error) {
  alert(error.message);
  });

 


//====================Jaron's Section=====================//
  //Weather API
   // This is our API key
   var APIKey = "166a433c57516f51dfab1f7edaed8413";

   // Here we are building the URL we need to query the database
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
     "q="+ location_1 +",Burundi&units=imperial&appid=" + APIKey;

     https://www.eventbriteapi.com/v3/events/search?location.address=vancovuer&location.within=10km&expand=venue&token=D5NQE7TMJX4PHIHKIRHQ

   // Here we run our AJAX call to the OpenWeatherMap API
   $.ajax({
     url: queryURL,
     method: "GET"
   })
     // We store all of the retrieved data inside of an object called "response"
     .then(function(response) {

       // Log the queryURL
       console.log(queryURL);

       // Log the resulting object
       console.log(response);

       // Transfer content to HTML
       $(".city").html("<h1>" + response.name + " Weather Details</h1>");
       $(".weather").text("Weather: " + response.weather[0].description);
       $(".temp").text("Temperature (F) " + response.main.temp);

       // Log the data in the console as well
       console.log("weather: " + response.weather);
       console.log("Temperature (F): " + response.main.temp);
     });