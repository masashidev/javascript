console.log('Hello from .js');

let canvas = document.querySelector('canvas');
let body = document.querySelector('body');
let ctx = canvas.getContext('2d');
let rectangles = [];
let currentRectangleIndex = null;  // the rectangle that is being dragged
let isDragging = false;
let startX;
let startY;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#F1FADA';

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let offset_x;
let offset_y;

function getOffset() {
  let canvasOffset = canvas.getBoundingClientRect();
  offset_x = canvasOffset.left;
  offset_y = canvasOffset.top;
}

getOffset();
window.onscroll = getOffset;
window.onresize = getOffset;
canvas.onscroll = getOffset;

let textFont = '30px Arial';
let textColor = 'black';

function createRectangle(x, y, width, height, color, text) {
  let rectangle = {
    x: x,
    y: y,
    width: width,
    height: height,
    color: color,
    text: text
  };
  rectangles.push(rectangle);
}

function drawRectangles() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  rectangles.forEach(rectangle => {
    ctx.fillStyle = rectangle.color;
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    ctx.font = textFont;
    ctx.fillStyle = textColor;
    ctx.fillText(rectangle.text, rectangle.x + 10, rectangle.y + 30);
  });
}

// focus on the rectangle

function editRectangleText() {
  let text = prompt('Enter text');
  rectangles[currentRectangleIndex].text = text;
  drawRectangles();
}







function isMouseOverRectangle(x, y, rectangle) {
  return x >= rectangle.x && x <= rectangle.x + rectangle.width && y >= rectangle.y && y <= rectangle.y + rectangle.height;
}

function mouseDown(event) {
  event.preventDefault();

  startX = event.clientX - offset_x;
  startY = event.clientY - offset_y;

  let mouseOverRectangle = false;

  rectangles.forEach(rectangle => {
    if (isMouseOverRectangle(startX, startY, rectangle)) {
      console.log('inside');
      isDragging = true;
      currentRectangleIndex = rectangles.indexOf(rectangle);
      mouseOverRectangle = true;
      console.log('currentRectangleIndex: ' + currentRectangleIndex);
    }
  });

  if (!mouseOverRectangle) {
    console.log('outside');
    createRectangle(startX, startY, 100, 100, 'white', 'Hello');
    drawRectangles();
    console.log(rectangles);
  }
};

function mouseUp(event) {
  if (!isDragging) {
    return;
  }
  event.preventDefault();
  isDragging = false;
  currentRectangleIndex = null;
}

function mouseOut(event) {
  if (!isDragging) {
    return;
  }
  event.preventDefault();
  isDragging = false;
  currentRectangleIndex = null;
}

function mouseMove(event) {
  if (!isDragging) {
    return;
  } else {
    event.preventDefault();
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let dx = mouseX - startX;
    let dy = mouseY - startY;
    let currentRectangle = rectangles[currentRectangleIndex];
    currentRectangle.x += dx;
    currentRectangle.y += dy;
    drawRectangles();
    startX = mouseX;
    startY = mouseY;
  }
}






createRectangle(100, 100, 100, 100, 'white', 'Hello')
drawRectangles();


canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove;

// get saved data from local storage
// add rectangle to list
// draw the canvas
// draw the list

// take input from user
// when enter is pressed, create a rectangle with the input

// create a rectangle where the user clicks
// ask for input while focusing on the rectangle
// when enter is pressed, the rectangle is created
// resize the rectangle according to the input size

// make rectangles resizable

// make rectangles draggable
// detect if the mouse is over the rectangle
// detect if the mouse is clicked
// detect if the mouse is moved
// match the rectangle with the mouse
// move the rectangle with the mouse
// detect if the mouse is released
// set position of the element where the mouse is released
// remove the element from the list
