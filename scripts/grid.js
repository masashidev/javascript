//create grid of 10x10
let grid = 20;
//create a canvas
let canvas = document.createElement('canvas');
//set the canvas width and height
const container = document.querySelector('#grid-container');
canvas.width = container.clientWidth;
canvas.height = container.clientHeight
//get the context of the canvas
let ctx = canvas.getContext('2d');
//append the canvas to the body
container.appendChild(canvas);
//draw the grid
for (let i = 0; i < canvas.width; i += grid) {
  for (let j = 0; j < canvas.height; j += grid) {
    ctx.strokeRect(i, j, grid, grid);
    ctx.lineWidth = 0.1 ;
  }
}

//if grid is clicked, draw a rectangle
canvas.addEventListener('click', function(event) {
  let x = Math.floor(event.offsetX / grid) * grid;
  let y = Math.floor(event.offsetY / grid) * grid;
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
  for (let i = 0; i < canvas.width; i += grid) {
    for (let j = 0; j < canvas.height; j += grid) {
      ctx.strokeRect(i, j, grid, grid);
      ctx.lineWidth = 0.1 ;
      console.log(grid);
    }
  }
});



const h1 = document.createElement('h1');
h1.textContent = 'Draggable';
document.body.appendChild(h1);
