//create grid of 10x10
var grid = 20;
//create a canvas
var canvas = document.createElement('canvas');
//set the canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//get the context of the canvas
var ctx = canvas.getContext('2d');
//append the canvas to the body
const container = document.querySelector('.container');
container.appendChild(canvas);
//draw the grid
for (var i = 0; i < canvas.width; i += grid) {
  for (var j = 0; j < canvas.height; j += grid) {
    ctx.strokeRect(i, j, grid, grid);
    ctx.lineWidth = 0.1 ;
  }
}

//if grid is clicked, draw a rectangle
canvas.addEventListener('click', function(event) {
  var x = Math.floor(event.offsetX / grid) * grid;
  var y = Math.floor(event.offsetY / grid) * grid;
  ctx.fillRect(x, y, grid, grid);
});

//add a slide bar to change the grid size
const slider = document.createElement('input');
slider.type = 'range';
slider.min = 10;
slider.max = 100;
slider.value = 20;
container.appendChild(slider);
slider.addEventListener('input', function() {
  grid = this.value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < canvas.width; i += grid) {
    for (var j = 0; j < canvas.height; j += grid) {
      ctx.strokeRect(i, j, grid, grid);
      ctx.lineWidth = 0.1 ;
      console.log(grid);
    }
  }
});



const h1 = document.createElement('h1');
h1.textContent = 'Draggable';
document.body.appendChild(h1);
