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

