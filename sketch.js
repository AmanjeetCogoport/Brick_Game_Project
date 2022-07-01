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


