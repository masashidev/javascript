console.log(  'Hello from mobile_view.js' )

// constant variables

// global variables

// state variables
  // canvas entities

// utility functions
  // Draw a circle


//dom elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#000000';


//event listeners
function setupEventListeners() {
  canvas.addEventListener('pointerdown', handlePinterDown);
  canvas.addEventListener('pointermove', handlePointerMove);
  canvas.addEventListener('pointerup', handlePointerup);
}

// object classes
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
// physical objects
  // constructor

  //gravity method

  //update method

  //draw method



// event handler functions
function handlePinterDown(event) {
  console.log('pointerdown');
}

function handlePointerMove(event) {
  console.log('pointermove');
}

function handlePointerup(event) {
  console.log('pointerup');
}

// animation variables
// animation function


// instances variables


// initialization
function init() {
  setupEventListeners();
}

// application start
document.addEventListener('DOMContentLoaded', init);
