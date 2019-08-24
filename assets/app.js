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
// var token ="D5NQE7TMJX4PHIHKIRHQ"
// var location = "this_is_a_test"
var settings = {
  "async": true,
  "crossDomain": true,
  // "url": "https://www.eventbriteapi.com/v3/events/search?location.address=vancovuer&location.within=10km&expand=venue&token="+ token,
  // "url": 'https://www.eventbriteapi.com/v3/events/search/?token='+ token + "&location.address=vancovuer&location.within=10km&expand=venue",
  //"url": "https://www.eventbriteapi.com/v3/events/search/?location.within=50km&location.latitude=-27.466667&location.longitude=153.033333&&categories=102&token=D5NQE7TMJX4PHIHKIRHQ",
  "url": "https://www.eventbriteapi.com/v3/events/search/?location.address=salt+lake+city&location.within=10km&start_date.keyword=next_week",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer D5NQE7TMJX4PHIHKIRHQ",
    // "Content-Type": "application/json"
  }
 }
 $.ajax(settings).done(function (response) {
  console.log(response);
 });



//====================Kris End============================//
//====================Jaron's Section=====================//
   // This is our API key
   var APIKey = "166a433c57516f51dfab1f7edaed8413";

   // Here we are building the URL we need to query the database
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
     "q=Salt+lake+city,Burundi&units=imperial&appid=" + APIKey;

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
// $(document).ready(function() {
		
//   //anon oauth token
//   var token = 'GGAQ2BUKIRGJMZMU55YZ';
//   //org id
//   var organizer = '8231868522';

//   var $events = $("#events");
  
//   $events.html("<i>Loading events, please stand by...</i>");
//   $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&organizer.id='+organizer+'&expand=venue', function(res) {
//     if(res.events.length) {
//       var s = "";
//       for(var i=0;i<res.events.length;i++) {
//         var event = res.events[i];
//         var eventTime = moment(event.start.local).format('M/D/YYYY h:mm A');
//         console.dir(event);
//         s += "<div class='eventList'>";
//         s += "<h2><a href='" + event.url + "'>" + event.name.text + "</a></h2>";
//         s += "<p><b>Location: " + event.venue.address.address_1 + "</b><br/>";
//         s += "<b>Date/Time: " + eventTime + "</b></p>";
        
//         s += "<p>" + event.description.text + "</p>";
//         s += "</div>";
//       }
//       $events.html(s);
//     } else {
//       $events.html("<p>Sorry, there are no upcoming events.</p>");
//     }
//   });
  

  
// });



//====================Jaron End===========================//
//====================Dallin's Section====================//





//====================Dallin End==========================//
//====================Emily's Section=====================//




$("#submit-button").on("click", function(event) {
  event.preventDefault();

  // Capture User Inputs and store them into variables
  var name=$("#name-input").val();
  var budget= $("#budget-input").val();
  var time=$("#time-input").val();
  var age=$("#age-input").val();
  var location=$("#location-input").val();

  // Console log each of the user inputs to confirm we are receiving them correctly
  console.log(name);
  console.log(budget);
  console.log(time);
  console.log(age);
  console.log(location);


  localStorage.setItem("name-input", name);
  localStorage.setItem("budget-input", budget);
  localStorage.setItem("time-input", time);
  localStorage.setItem("age-input", age);
  localStorage.setItem("location-input", location);
});



// $("#submit-button").on("click", function (event) {
//     event.preventDefault();
    
// });
//====================Emily End===========================//