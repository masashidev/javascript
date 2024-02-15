console.log(  'Hello from mobile_view.js' )

// constant variables

// global variables

// state variables

// utility functions

//dom elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#000000';


//event listeners
function setupEventListeners() {
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
}

// event handler functions
function handleMouseDown(event) {
  console.log('mousedown');
}

// initialization
function init() {
  setupEventListeners();
}

// application start
document.addEventListener('DOMContentLoaded', init);
