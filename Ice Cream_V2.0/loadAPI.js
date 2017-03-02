var link = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
var link2 = "%2C%20";
var link3 = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
var loc = link.concat(city,link2,city,link3);
// These variables allow me to combine strings, and add different location data to the API's URL

function loadLocation() { // Loads London JSON data
    var city = textbox.value();
    var loc = link.concat(city,link2,city,link3); //combines strings
    loadJSON(loc,weatherLoaded);
}

function keyPressed() { // This function restarts, and loads new location data when the user presses enter.
    if(keyCode == ENTER) {
       loadLocation(); // Loads location data for search term
       drips.splice(0,1000); // Removes previous drips from the array
       setTimeout(resetSketch,timeout); // Restarts sketch
    } 
}

function textBox(){ // Creates and styles the textbox
    textbox = createInput();
    textbox.changed(loadLocation);
    textbox.position(50,height*0.25)
    textbox.style('font-size', '40px');
    textbox.style('background', 'transparent');
    textbox.style('border', '0px');
    textbox.style('outline', '0');
    textbox.style('font-family', 'Montserrat, sans-serif');
    textbox.style('color', '#969696');
}

function drawButtons() { // Buttons for celcius and farenheit
  button1 = createButton('°C');
  button1.position(50, height*0.5)
  button1.style('font-size', '40px');
  button1.style('background', 'transparent');
  button1.style('border', '0px');
  button1.style('font-family', 'Montserrat, sans-serif');
  button1.style('cursor', 'pointer');
  button1.style('font-weight', 'bold');
  button1.mousePressed(celcius = function(){
  unit = "°C";
  loadLocation();
  button1.style('outline', 'none');
  if (unit === "°C") {
    button2.style('font-weight', 'normal');
    button1.style('font-weight', 'bold');
  }
  });
  
  button2 = createButton('°F');
  button2.position(200, height * 0.5);
  button2.style('font-size', '40px');
  button2.style('background', 'transparent');
  button2.style('border', '0px');
  button2.style('font-family', 'Montserrat, sans-serif');
  button2.style('cursor', 'pointer');
  button2.mousePressed(farenheit = function(){
  unit = "°F";
  loadLocation();
  button2.style('outline', 'none');
  if (unit === "°F") {
    button2.style('font-weight', 'bold');
    button1.style('font-weight', 'normal');
  }
  });
}
