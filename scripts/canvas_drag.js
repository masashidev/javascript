console.log('Hello from random_propositions.js');

let canvas = document.createElement('canvas');
let body = document.querySelector('body');
let ctx = canvas.getContext('2d');

body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.setAttribute('style', 'background-color: #D7E4C0;');

// resize canvas when window is resized
window.addEventListener('resize', function() {
  resizeCanvas();
  rectangle.matchWidthToText();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangle.draw();
  console.log('resize');
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// define a class for a rectangle with text
class Rectangle {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(this.text, this.x + 20, this.y + 50);

  }

  // get pixel length of text
  getTextWidth(text, font) {
    ctx.font = font;
    return ctx.measureText(text).width;
  }

  // match the width of the rectangle to the width of the text
  matchWidthToText() {
    this.width = this.getTextWidth(this.text, '30px Arial') + 40;
  }

  // make the rectangle draggable
  drag() {
    let isDragging = false;
    let offsetX, offsetY;

    canvas.addEventListener('mousedown', function(event) {
      if (event.x > this.x && event.x < this.x + this.width && event.y > this.y && event.y < this.y + this.height) {
        isDragging = true;
        offsetX = event.x - this.x;
        offsetY = event.y - this.y;
      }
    });

    canvas.addEventListener('mousemove', function(event) {
      if (isDragging) {
        this.x = event.x - offsetX;
        this.y = event.y - offsetY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
      }
    });

    canvas.addEventListener('mouseup', function() {
      isDragging = false;
    });
  }

  // pointer over rectangle
  pointerOver() {
    canvas.addEventListener('mousemove', function(event) {
      if (event.x > this.x && event.x < this.x + this.width && event.y > this.y && event.y < this.y + this.height) {
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'default';
      }
    });
  }
}

// array of rectangles
let rectangles = [];

// add a new rectangle to the array
let newRectangle = new Rectangle(100, 100, 200, 100, 'Hello');
rectangles.push(newRectangle);
let newRectangle2 = new Rectangle(500, 300, 200, 100, 'World');
rectangles.push(newRectangle2);

// draw all rectangles
rectangles.forEach(rectangle => {
  rectangle.draw();
});

// make the rectangle draggable
rectangles.forEach(rectangle => {
  rectangle.drag();
  rectangle.pointerOver();
});
