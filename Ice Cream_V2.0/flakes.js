var numflakes = 50; // Number of snowflakes in the array
var flakes = []; // Array of snowflakes
var img2; // Snowflake image

function setupFlakes() {
    for (var n = 0; n < 100; n++) { // Snowflake array
        flakes[n] = new Flake();
    }
}

function drawFlakes() {
    for (var n = 0; n < flakes.length; n++) { // Snowflake array
        flakes[n].move();
        flakes[n].display();
    }
}
  
function Flake() {
    this.x = random(0, width); // Start position of snowflakes
    this.y = random(0, height);
    
    this.xspeed = random(-1,2) // Speed of snowflakes
    this.yspeed = random(1,2)

    this.display = function() {
        image(img2, this.x, this.y, 25, 25) // Draws snowflake image
    }

    this.move = function() {
        this.x = this.x + this.xspeed; // Adds speed to x and y
        this.y = this.y + this.yspeed;
        this.reset();
    }
    
    this.reset = function () { // Resets y position of the snowflakes to 0 when they reach the bottom of canvas.
        if (this.y >= height) {
            this.y = 0;
        } else {
            this.y += this.yspeed
        }
    }
}