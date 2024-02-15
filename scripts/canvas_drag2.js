// Canvas setup
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#F1FADA';

// Constants
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const textFont = '30px Arial';
const textColor = 'black';

// State variables
let rectangles = [];
let currentRectangleIndex = null;
let isDragging = false;
let startX, startY;
let deleteTimeout;

// Utility functions
function getOffset() {
  const canvasOffset = canvas.getBoundingClientRect();
  return { x: canvasOffset.left, y: canvasOffset.top };
}

function isMouseOverRectangle(x, y, rectangle) {
  return x >= rectangle.x && x <= rectangle.x + rectangle.width && y >= rectangle.y && y <= rectangle.y + rectangle.height;
}

// Rectangle functions
function createRectangle(x, y, width, height, color, text) {
  rectangles.push({ x, y, width, height, color, text });
}

function drawRectangles() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  rectangles.forEach(rect => {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.font = textFont;
    ctx.fillStyle = textColor;
    ctx.fillText(rect.text, rect.x + 10, rect.y + 30);
  });
}

function deleteRectangle(index) {
  rectangles.splice(index, 1);
  drawRectangles();
}

// Event handler functions
function handleMouseDown(event) {
  const { x: offsetX, y: offsetY } = getOffset();
  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;
  let mouseOverRectangle = false;

  rectangles.forEach((rect, index) => {
    if (isMouseOverRectangle(x, y, rect)) {
      isDragging = true;
      currentRectangleIndex = index;
      mouseOverRectangle = true;
      deleteTimeout = setTimeout(() => deleteRectangle(index), 500);
    }
  });

  if (!mouseOverRectangle) {
    createRectangle(x, y, 100, 100, 'white', 'Hello');
    drawRectangles();
  }
}

function handleMouseMove(event) {
  if (!isDragging) return;
  const dx = event.clientX - startX;
  const dy = event.clientY - startY;
  const rect = rectangles[currentRectangleIndex];
  rect.x += dx;
  rect.y += dy;
  drawRectangles();
  startX = event.clientX;
  startY = event.clientY;
  console.log(dx, dy );
  console.log(rect.x, rect.y);
}

function handleMouseUp() {
  clearTimeout(deleteTimeout);
  isDragging = false;
  currentRectangleIndex = null;
}

function handleMouseOut() {
  clearTimeout(deleteTimeout);
  if (isDragging) {
    isDragging = false;
    currentRectangleIndex = null;
  }
}

// Initialization
function init() {
  createRectangle(100, 100, 100, 100, 'white', 'Hello');
  drawRectangles();
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseout', handleMouseOut);
  window.addEventListener('scroll', getOffset);
  window.addEventListener('resize', getOffset);
}

init();
