// Code written by George Edmonds

var img; // Cone
var img3; // Icecycles
var img4; // Map
var sound; // Drip sound
var puddle = 10; // Variable for increasing the puddle size.
var todelete = false; // Checks if a drip should be deleted.
var drips = []; // Drip array
var temp; // Temperature from JSON data.
var city = "City"; // City from JSON data.
var region = " Region"; // Region from JSON data.
var country = "Country"; // Country from JSON data.
var numdrips; // Variable for the number of drips.
var timeout = 500; // Timeout for 'resetSketch'.

var Leixo // Font
function preload() { // Preloads fonts and drip sound.
    Leixo = loadFont("assets/Leixo.ttf");
    Numbers = loadFont("assets/Numbers.ttf");
    //sound = loadSound('assets/Drip.mp3');
    //sound.amp(0.1);
}

var counter = 0;

function keyPressed() {
    if(keyCode == RIGHT_ARROW) { 
        counter = counter + 1; 
    } // Adds 1 to 'counter' when Right Arrow is pressed.
    if (keyCode == LEFT_ARROW) {
        counter = counter - 1;
    } // Subracts 1 from 'counter' when Left Arrow is pressed.
    if (counter < 1) {
        counter = 6;
    } else if (counter > 6) {
        counter = 1;
    } // This insures 'counter' will never be above 6 or below 0.
    
    if (counter === 1) {
        loadLondon();
  } if (counter === 2) {
        loadNewyork();
  } if (counter === 3) {
        loadTokyo();  
  } if (counter === 4) {
        loadPaulo();
  } if (counter === 5) {
        loadMelbourne();
  } if (counter === 6) {
        loadJuneau();
  } 
}

// If statements load corrosponding JSON data based on 'counter'
// Users can now navigate through locations using arrow keys.

function setup() {
    createCanvas(1280, 720);
    img = loadImage("assets/pattern.png");
    img2 = loadImage("assets/Snowflake.png");
    img3 = loadImage("assets/Ice.png");
    img4 = loadImage ("assets/Map.png");
    resetSketch();
}


function weatherLoaded(data) {
    temp = data.query.results.channel.item.condition.temp; // Temperature data
    temp = parseInt(((temp - 32) * 5) / 9); // Converts farenheit to celcius to the nearest interger.
    city = data.query.results.channel.location.city; // City name
    region = data.query.results.channel.location.region; // Region name
    country = data.query.results.channel.location.country; // Country name
    
    if (region === " Tokyo Prefecture"){ // Abreviates region name for Tokyo.
    region = " TP";
  }
}

function drawMap() {
    if (counter === 1) { // London
        this.x = 1000;
        this.y = 515;
  } if (counter === 2) { // New York
        this.x = 940;
        this.y = 530;
  } if (counter === 3) { // Tokyo
        this.x = 1145;
        this.y = 540;
  } if (counter === 4) { // Sao Paulo
        this.x = 960;
        this.y = 600;
  } if (counter === 5) { // Melbourne
        this.x = 1150;
        this.y = 605;
  } if (counter === 6) { // Juneau
        this.x = 885;
        this.y = 520;
  }
  
  // If statements change ellipses x and y depending on location. 
  
  image(img4, width*0.65, height*0.6, 350, 200); // Loads map image
  noStroke();
  fill(255);
  ellipse(this.x, this.y, 20, 20);
}

function drawText(){
    var t = String(temp)
    if (temp === undefined) { // Insures temperature doesn't show up as 'Undefined' on start.
        this.t = "";
    } else {
        this.t = t;
    }
    
    // Text properties for temperature.
    textFont(Numbers);
    textSize(50);
    textAlign(CENTER);
    fill(255);
    strokeWeight(10);
    stroke(0);
    text(concat(this.t,"°C"),width/2,height*0.65); // Adds °C to the end of the temperature value.
    
    // Text properties for region.
    textFont(Leixo);
    textAlign(LEFT);
    noStroke();
    fill(0);
    textSize(40);
    text(city.concat(",",region), 50,height*0.8); // Adds comma inbetween city and region.
    
    // Text properties for country
    textSize(25);
    textAlign(LEFT);
    fill(255);
    text(country, 50, height*0.85);
    
    // Adds instruction to the screen on start.
    if (counter === 0) {
        textAlign(CENTER);
        fill(0);
        text("USE LEFT AND RIGHT ARROW KEYS TO CHANGE LOCATION", width/2, height *0.07);
    }
}

function tempDrips() { // Changes number of drips in array based on temperature.
    if (temp <=1) {
        numdrips = 0;
    } else {
        numdrips = temp;
    } if (temp <10)
        numdrips = numdrips/2;
    } if (temp >25) {
        numdrips = numdrips*2;
}

function resetSketch() {
    drips.splice(0,1000); // Removes drips from array
    puddle = 10; // Resets puddle size
    for (var i = 0; i < numdrips; i++) { // Array of drips
    drips[i] = new Drip();
    }
    setupFlakes(); // Array of snowflakes (see flakes.js)
}

function draw() {
    background(200);
    tempDrips();
    drawMap();
    renderPuddle();
    renderCone();
    renderScoops();
    drawText();
    
    for (var i = 0; i < drips.length; i++) { // Draws array of drips.
        drips[i].move();
        drips[i].display();
    }
  
    if (todelete === true) { // Removes drips from array when they reach the bottom of canvas.
        drips.splice(0,3);
    }
    
    if (temp <=1) { // Draws snowflakes when temperature is less than 1 degrees.
        drawFlakes();
    }
}

function renderScoops() {
    this.opacity = 255;
    this.opacity = this.opacity - puddle; // Changes alpha of scoops, gives melting effect.
    
    fill(215,120,166, this.opacity); // Sets initial fill and stroke
    stroke(226,59,147, this.opacity);
    
    if (temp <=1) { // White
        fill(255, this.opacity);
        stroke(193,254,255, this.opacity);
    }
    if (temp >1 && temp <= 10) { // If between values change to blue
        fill(137,240,255, this.opacity);
        stroke(0,190,219, this.opacity);
    }
    if (temp >10 && temp <= 15) { // Turqouise
        fill(91,249,233, this.opacity);
        stroke(0,208,187, this.opacity);  
    }
    if (temp > 15 && temp <= 20) { // Yellow
        fill(255,255,0, this.opacity);
        stroke(255,222,0, this.opacity);  
    }
    if (temp > 20 && temp <= 25) { // Orange
        fill(255,150,0, this.opacity);
        stroke(219,124,0, this.opacity);  
    }
    if (temp > 25) { // Red
        fill(255,0,0, this.opacity);
        stroke(183,0,6, this.opacity);  
    }
    
    // If statements change the fill and stroke of the scoops based on the temperature value.
    
    strokeWeight(10);
    
    // Scoops
    ellipse(width/2, height*0.3, 250, 250);
    ellipse(width*0.45, height*0.33, 75, 75);
    ellipse(width*0.42, height*0.4, 100, 100);
    ellipse(width*0.57, height*0.37, 150, 150);
    ellipse(width*0.5, height*0.4, 125, 120);

    if (temp <=1) { // Draws icycle image when temperature is less than one degrees.
        image(img3, 0, 0);
    }
}

function renderCone() { // Draws cone shape and adds pattern.
    this.ypos = height*0.4;
    fill(229,165,82);
    stroke(191,119,40);
    strokeWeight(10);
    triangle(width/2, height*0.9, width*0.4, this.ypos, width*0.6, this.ypos);
    image(img, 0, 0);
}

function renderPuddle() {
    if (temp <= 10) { // Blue
        fill(137,240,255,100); 
        noStroke(0);
    }
    if (temp >10 && temp <= 15) { // Turqouise
        fill(91,249,233,100);
        noStroke(0);
    }
    if (temp > 15 && temp <= 20) { // Yellow
        fill(255,255,0,100);
        noStroke(0);
    }
    if (temp > 20 && temp <= 25) { // Orage
        fill(255,150,0,100);
        noStroke(0);
    }
    if (temp > 25) { // Red
        fill(255,0,0,100);
        noStroke(0);
    }
    
    // Changes size of puddle when drips reach it.
    if (puddle > 10) { 
        ellipse(width/2, height*0.9, 100+puddle, 30+puddle);
    }
}


function Drip() { // Drip object

    this.speed = random(2,4); // Speed of falling drips.
    this.opacity = 255; // Starting alpha of falling drips.
    
    this.x = random(width*0.42,width*0.57); // Starting location of drips.
    this.y = random(height*0.3,height*0.4);

    this.display = function() { // Appearence paramiters for drips
    
        if (temp >1 && temp <= 10) { // White
            fill(137,240,255, this.opacity);
            stroke(0,190,219, this.opacity);
        }
        if (temp >10 && temp <= 15) { // Blue
            fill(91,249,233, this.opacity);
            stroke(0,208,187, this.opacity);  
        }
        if (temp > 15 && temp <= 20) { // Turquoise
            fill(255,255,0, this.opacity);
            stroke(255,222,0, this.opacity);  
        }
        if (temp > 15 && temp <= 20) { // Yellow
            fill(255,255,0, this.opacity);
            stroke(255,222,0, this.opacity);  
        }
        if (temp > 20 && temp <= 25) { // Orange
            fill(255,150,0, this.opacity);
            stroke(219,124,0, this.opacity);  
        }
        if (temp > 25) { // Red
            fill(255,0,0, this.opacity);
            stroke(183,0,6, this.opacity);  
        }
        
      strokeWeight(5);
      ellipse(this.x, this.y, 20, 25);
}

    this.move = function() {
        this.y = this.y + this.speed; // Moves 'y' according to speed.
        
        if (this.y >= height*0.9) { // If drip reaches bottom of the canvas...
        todelete = true; // Changes todelete to true which removes this drip from the array.
        puddle = puddle + 0.5; // Increases puddle size.
        this.opacity = this.opacity - 255; // Changes aplha of drip to 0.
        //sound.play(); // Plays drip sound.
        } 
        else {
        todelete = false; // Drip will not be deleted.
        puddle = puddle; // Puddle is the orginal size.
        }
    }
}