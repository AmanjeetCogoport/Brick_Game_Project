// ******** All Global Variable goes here *************

const [RIGHT, LEFT] = [1, -1];
const height_pad = 30;
const width_pad = 140;
const col = ["#E22D2D", "#FAA300", "#9BC53D"];
const clr = ["green", "yellow", "red", "blue", "violet"]

let pad;  // for paddle
let ball; // for ball
let briks = [];  // for storing the instance of briks
let direction = "";
let score = 0, live = 3;
let possx=400, possy=30;

// added score and live functionality.
// show scores and live
function show_score(){
    fill("white");
    textSize(20)
    text("Score : " + score, possx, possy)
    text("Live : " + live, possx + 120, possy)
  }


// will create random color in rgb.
function random_color() {
    color = `rgb(${parseInt(Math.random() * 254) + 1}, ${
      parseInt(Math.random() * 254) + 1
    }, ${parseInt(Math.random() * 254) + 1})`;
    return color;
  }
  
  
  // will create random number beetween 2 given number.
  function random_num(x, y) {
    let number = parseInt(x + Math.random() * (y - x));
    return number;
  }

// add live and score calculatin as well as updation functionality.







// ********* creating classes for all the objects that this game has one by one :*******

// creating Pad class
class Pad {
    constructor(posX, posY) {
      this.l = width_pad;
      this.h = height_pad;
      this.y = posY;
      this.x = posX -  width_pad/ 2;
      this.speed = 5.5;
    }
  
    show() {
      if (this.x <= 0) {
        this.x = 0;
      }
  
      if (this.x + this.l >= width) {
        this.x = width - this.l;
      }
  
      fill(random_color());
      rect(this.x, this.y, this.l, this.h, 10);
    }
  
  
    move(dir) {
      this.x += dir * this.speed;
    }
  }

