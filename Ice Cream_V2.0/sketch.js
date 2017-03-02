// Code written by George Edmonds

var img; // Cone
var img3; // Icecycles
var img4; // Map
var sound; // Drip sound
var puddle = 10; // Variable for increasing the puddle size.
var drips = []; // Drip array
var temp; // Temperature from JSON data.
var temp2;
var city = "City"; // City from JSON data.
var region = " Region"; // Region from JSON data.
var country = "Country"; // Country from JSON data.
var numdrips; // Variable for the number of drips.
var timeout = 1000; // Timeout for 'resetSketch'.
var textbox; // Textbox variable
var unit = "°C" // Loads the default unit for temperature as celcius

var Leixo // Font
function preload() { // Preloads fonts and drip sound.
    Leixo = loadFont("assets/Leixo.ttf");
    Numbers = loadFont("assets/Numbers.ttf");
    sound = loadSound('assets/Drip.mp3');
    sound.amp(0.1);
}

function setup() {
    createCanvas(1280, 720);
    img = loadImage("assets/pattern.png");
    img2 = loadImage("assets/Snowflake.png");
    img3 = loadImage("assets/Ice.png");
    img4 = loadImage ("assets/Map.png");
    drawButtons();
    textBox();
    resetSketch();
}

function weatherLoaded(data) {
    temp = data.query.results.channel.item.condition.temp; // Temperature data
    temp2 = data.query.results.channel.item.condition.temp;
    temp2 = parseInt(((temp2 - 32) * 5) / 9);
    city = data.query.results.channel.location.city; // City name
    region = data.query.results.channel.location.region; // Region name
    country = data.query.results.channel.location.country; // Country name
    if (unit === "°C") {
    temp = parseInt(((temp - 32) * 5) / 9); // Converts the temperature to farenheit
    } if (unit === "°F"){
    temp = temp;
    }
}

function drawText(){
    var t = String(temp) // Converts the temperature value to a string
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
    text(concat(this.t, unit),width*0.7,height*0.65); // Adds °C to the end of the temperature value.
    
    textFont(Leixo);
    textAlign(LEFT);
    noStroke();
    fill(0);
    textSize(30);
    text("ENTER CITY or POSTCODE", 50, height*0.2);
    
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
    
}

function tempDrips() { // Changes number of drips in array based on temperature.
    if (temp2 <=1) {
        numdrips = 0;
    } else {
        numdrips = temp2;
    } if (temp2 <10)
        numdrips = numdrips/2;
    } if (temp2 >25) {
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
    renderPuddle();
    renderCone();
    renderScoops();
    drawText();
    
    for (var i = 0; i < drips.length; i++) { // Draws array of drips.
        drips[i].move();
        drips[i].display();
    }
    
    for (var i = 0; i < drips.length; i++) { // Deletes the drip that hits the floor
        if (drips[i].toDelete) {
            drips.splice(i, 1); // 'i' is the drip that hits the floor, 1 is the amount of drips to be deleted.
        }
    }
    
    if (temp2 <=1) { // Draws snowflakes when temperature is less than 1 degrees.
        drawFlakes();
    }
    stroke(150)
    strokeWeight(5)
    line(50,height*0.32,470, height *0.32)
    stroke(150)
    strokeWeight(5)
    line(157,height*0.47,157, height *0.58)
}

function renderScoops() {
    this.opacity = 255;
    this.opacity = this.opacity - puddle; // Changes alpha of scoops, gives melting effect.
    
    fill(215,120,166, this.opacity); // Sets initial fill and stroke
    stroke(226,59,147, this.opacity);
    
    if (temp2 <=1) { // White
        fill(255, this.opacity);
        stroke(193,254,255, this.opacity);
    }
    if (temp2 >1 && temp2 <= 10) { // If between values change to blue
        fill(137,240,255, this.opacity);
        stroke(0,190,219, this.opacity);
    }
    if (temp2 >10 && temp2 <= 15) { // Turqouise
        fill(91,249,233, this.opacity);
        stroke(0,208,187, this.opacity);  
    }
    if (temp2 > 15 && temp2 <= 20) { // Yellow
        fill(255,255,0, this.opacity);
        stroke(255,222,0, this.opacity);  
    }
    if (temp2 > 20 && temp2 <= 25) { // Orange
        fill(255,150,0, this.opacity);
        stroke(219,124,0, this.opacity);  
    }
    if (temp2 > 25) { // Red
        fill(255,0,0, this.opacity);
        stroke(183,0,6, this.opacity);  
    }
    
    // If statements change the fill and stroke of the scoops based on the temperature value.
    
    strokeWeight(10);
    
    // Scoops
    ellipse(width*0.7, height*0.3, 250, 250);
    ellipse(width*0.65, height*0.33, 75, 75);
    ellipse(width*0.62, height*0.4, 100, 100);
    ellipse(width*0.77, height*0.37, 150, 150);
    ellipse(width*0.7, height*0.4, 125, 120);

    if (temp2 <=1) { // Draws icicle image when temperature is less than one degrees.
        image(img3, 256, 0);
    }
}

function renderCone() { // Draws cone shape and adds pattern.
    this.ypos = height*0.4;
    fill(229,165,82);
    stroke(191,119,40);
    strokeWeight(10);
    triangle(width*0.7, height*0.9, width*0.6, this.ypos, width*0.8, this.ypos);
    image(img, 256, 0);
}

function renderPuddle() {
    if (temp2 <= 10) { // Blue
        fill(137,240,255,100); 
        noStroke(0);
    }
    if (temp2 >10 && temp2 <= 15) { // Turqouise
        fill(91,249,233,100);
        noStroke(0);
    }
    if (temp2 > 15 && temp2 <= 20) { // Yellow
        fill(255,255,0,100);
        noStroke(0);
    }
    if (temp2 > 20 && temp2 <= 25) { // Orage
        fill(255,150,0,100);
        noStroke(0);
    }
    if (temp2 > 25) { // Red
        fill(255,0,0,100);
        noStroke(0);
    }
    
    // Changes size of puddle when drips reach it.
    if (puddle > 10) { 
        ellipse(width*0.7, height*0.9, 100+puddle, 30+puddle);
    }
}


function Drip() { // Drip object

    this.speed = random(4,6); // Speed of falling drips.
    this.opacity = 255; // Starting alpha of falling drips.
    
    this.x = random(width*0.62,width*0.77); // Starting location of drips.
    this.y = random(height*0.3,height*0.4);
    
    this.toDelete = false;

    this.display = function() { // Appearence paramiters for drips
    
        if (temp2 >1 && temp2 <= 10) { // White
            fill(137,240,255);
            stroke(0,190,219);
        }
        if (temp2 >10 && temp2 <= 15) { // Blue
            fill(91,249,233);
            stroke(0,208,187);  
        }
        if (temp2 > 15 && temp2 <= 20) { // Turquoise
            fill(255,255,0);
            stroke(255,222,0);  
        }
        if (temp2 > 15 && temp2 <= 20) { // Yellow
            fill(255,255,0);
            stroke(255,222,0);  
        }
        if (temp2 > 20 && temp2 <= 25) { // Orange
            fill(255,150,0);
            stroke(219,124,0);  
        }
        if (temp2 > 25) { // Red
            fill(255,0,0);
            stroke(183,0,6);  
        }
        
        strokeWeight(5);
        ellipse(this.x, this.y, 20, 25)
    }

    this.move = function() {
        this.y = this.y + this.speed; // Moves 'y' according to speed.
        
        if (this.y >= height*0.9) { // If drip reaches bottom of the canvas...
        //todelete = true; // Changes todelete to true which removes this drip from the array.
        puddle = puddle + 10; // Increases puddle size.
        sound.play(); // Plays drip sound.
        this.toDelete = true // Drip will be deleted
        } 
        else {
        this.toDelete = false // Drip wont be deleted
        puddle = puddle; // Puddle is the orginal size.
        }
    }
}