//====================Kris's Section======================//




//====================Kris End============================//
//====================Jaron's Section=====================//





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