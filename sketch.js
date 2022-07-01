// ******** All Global Variable goes here *************

const [RIGHT, LEFT] = [1, -1];
const height_pad = 20;
const width_pad = 100;
let ball_diameter = 30;
const startPosBallX = 800 / 2;
const startPosBallY = 600 - 25;
const col = ["#E22D2D", "#FAA300", "#9BC53D"];
const clr = ["green", "yellow", "red", "pink", "violet"];
let liveClr = ["violet", "Red", "yellow", "green", "blue"];

let pad; // for paddle
let ball; // for ball
let briks = []; // for storing the instance of briks
let direction = "";
let score = 0,
  live = 4;
let possx = 450,
  possy = 40;
let outloop = 20;
let win = 0;

// added score and live functionality.
// show scores and live
function show_score() {
  fill("Blue");
  textSize(30);
  text("Score : " + score, possx, possy);
  fill(liveClr[live - 1]);
  text("Live : " + (live - 1), possx + 180, possy);
}

// calculate score
function calculate_score(increaseValue) {
  score += increaseValue;
  show_score();
}

// decrease life
// function decrease life
function decrease_life() {
  live--;
  show_score();
  if (live == 0) {
    // stop the game here only.
    noLoop();
    alert("You Win the Game!");
  }
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

// ********* creating classes for all the objects that this game has one by one :*******

// creating Pad class
class Pad {
  constructor(posX, posY) {
    this.l = width_pad;
    this.h = height_pad;
    this.y = posY;
    this.x = posX - width_pad / 2;
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

// creating ball class

class Ball {
  constructor(posX, posY, diameter, status) {
    this.pos = createVector(posX, posY);
    this.d = diameter;
    this.r = diameter / 2;
    this.v = createVector(3, -2.5); // create random 2d vector array for incresing the speed
    this.color = random_color();
    this.go = status;
  }

  // it take care of ball contacting with ball contacting with pad
  update(pad) {
    if (!(pad instanceof Pad) || this.show == false) {
      return false;
    }

    // console.log(this.v);
    // this.v.setMag(6);
    this.pos.add(this.v);

    let ballX = this.pos.x,
      x = ballX;
    let ballY = this.pos.y,
      y = ballY;
    let padX = pad.x;
    let padWidth = pad.l;
    let padHeight = pad.h;

    if (
      ballX + 15 > padX &&
      ballX - 15 < padX + padWidth &&
      ballY < height + padHeight - 25 &&
      ballY + 15 > height - 25
    ) {
      this.v.y = -this.v.y;
      var padCenter = padX + padWidth / 2;
      var ballDistFromPadCenter = ballX - padCenter;
      this.v.x = ballDistFromPadCenter * 0.2;
      // currScore += 1;
    }

    if (x - this.r <= 0 || x + this.r >= width) {
      this.v.x *= -1;
    }
    if (y - this.r <= 0) {
      this.v.y *= -1;
    }

    if (this.pos.y + this.r >= height) {
      if (--live <= 1) {
        this.show = false;
        // this.v.setMag(6);
      }
      this.v.y *= -1;
      // this.pos = createVector(startPosBallX, startPosBall)
    }

    if (this.pos.y + this.r >= pad.y && x >= pad.x && x <= pad.x + pad.l) {
      this.v.y *= -1;
    }
  }

  show() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.d);
  }
}

// ****** class for brick *******
class Brik {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.h = random_num(20, 30);
    this.l = random_num(50, 100);
    this.state = random_num(1, 5); // this will show that when pad will go out
    this.color = clr[this.state - 1];
  }

  show() {
    if (this.state >= 0) {
      fill(this.color);
      rect(this.x, this.y, this.l, this.h);
    }
  }

  updateState() {
    this.state--;
    if (this.state >= 1) this.color = clr[this.state - 1];
    return this.state < 0;
  }
}

// init takes 1 parameter g; if g is true, the ball moves; if g is false ball stay still.

function init(g) {
  briks = [];
  // pad = new Pad(width / 2, height - 60);
  pad = new Pad(width / 2, height - 30);
  ball = new Ball(width / 2, height / 2, ball_diameter, g);

  let space1 = (width - 500) / 6;
  let space2 = (width - 300) / 4;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      briks.push(new Brik(j * (100 + space1) + space1, 50 * i + 60));
    }
  }

  // for (let j = 0; j < 3; j++) {
  //   briks.push(new Brik(j * (100 + space2) + space2, 150));
  // }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    direction = "left";
  } else if (keyCode === RIGHT_ARROW) {
    direction = "right";
  }
  if (keyCode === 32) {
    init(true);
  }
}

function padControl() {
  // Script for smooth pad control
  if (direction === "left") {
    pad.move(LEFT);
  } else if (direction === "right") {
    pad.move(RIGHT);
  }

  if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    direction = "";
  }
}

// exection of game starts from here

function setup() {
  createCanvas(800, 600);

  init(false);
}

// this function run after every 10 milli second
function draw() {
  background(0);
  show_score();

  // console.log(briks.length);
  for (let b = briks.length - 1; b >= 0; b--) {
    let brik = briks[b];
    if (
      ball.pos.x > brik.x &&
      ball.pos.x < brik.x + brik.l &&
      ball.pos.y + ball.r > brik.y &&
      ball.pos.y - ball.r < brik.y + brik.h
    ) {
      if (brik.state >= 0) {
        score += brik.state * 5;
        ball.v.y *= -1;
        if (brik.updateState()) {
          briks.slice(b, 1);

          // checking condition for player to win the game i.e all bricks gets removed
          //   console.log(briks.length);
          if (++win >= 20) {
            ball.show = false;
            fill("green");
            textSize(80);
            textAlign(CENTER, CENTER);
            msg = "You Win";
            text(msg, width / 2, height / 2);
            text("Score : " + score, width / 2, height / 2 + 100);
            // noLoop();
            // bricks = [];
            ball.show();
            
          }
        }
      }
    }

    brik.show();
  }

  // Update ball and pad
  ball.update(pad);

  // Checking key for controlling pad
  padControl();

  // Showing elements
  pad.show();


  // Checking condition to loose the game
  try {
    ball.show();
  } catch (e) {
    // alert("Your Score is " + score);
    
    fill("red");
    textSize(80);
    textAlign(CENTER, CENTER);
    msg = "You Loss";
    text(msg, width / 2, height / 2);
    text("Score : " + score, width / 2, height / 2 + 100);
    // noLoop();
    bricks = [];
    // ball.show();
    if (!outloop--) ball.show();
  }
}
