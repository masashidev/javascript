function showWindowSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  document.getElementById('resize-check').textContent = width + ' x ' + height;
}

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let lastTime = 0; // Variable to store the last time the circles were drawn
const interval = 2000; // Time step in milliseconds
let timestampCheck = document.querySelector('#timestamp-check');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawCircle() {
  let radius = Math.floor(Math.random() * 40) + 10; // Random radius between 10 and 50
  // let x = Math.floor(Math.random() * canvas.width);
  // let y = Math.floor(Math.random() * canvas.height);
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let z = Math.floor(Math.random() * 2);
  let color = '#' + Math.floor(Math.random()*16777215).toString(16); // Random color

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawCircles(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const elapsed = timestamp - lastTime;

  if (elapsed > interval) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 5; i++) {
      drawCircle();
    }
    lastTime = timestamp;
  }
  window.requestAnimationFrame(drawCircles);
}


window.addEventListener('resize', function() {
  console.log('resize');
  resizeCanvas(); // Make sure to redraw circles after resizing
  showWindowSize(); // Update the displayed window size
});

// initial setup
showWindowSize();
resizeCanvas();
window.requestAnimationFrame(drawCircles);
