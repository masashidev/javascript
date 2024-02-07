function showWindowSize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  document.getElementById('resize-check').textContent = width + ' x ' + height;
}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawCircles();
}

function drawCircle() {
    var radius = Math.floor(Math.random() * 40) + 10; // Random radius between 10 and 50
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    var color = '#' + Math.floor(Math.random()*16777215).toString(16); // Random color

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCircles() {
  for (var i = 0; i < 100; i++) {
    drawCircle();
  }
}

window.addEventListener('resize', function() {
  console.log('resize');
  resizeCanvas(); // Make sure to redraw circles after resizing
  showWindowSize(); // Update the displayed window size
});

// initial setup
showWindowSize();
resizeCanvas();
drawCircles();
