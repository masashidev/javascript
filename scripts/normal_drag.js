const box = document.createElement('div');
box.classList.add('box');
box.textContent = 'Drag me';
box.setAttribute('draggable', true);

const bigBox = document.createElement('div');
bigBox.classList.add('big-box');
bigBox.textContent = 'Drop here';

const container = document.querySelector('#container');
container.appendChild(box);
container.appendChild(bigBox);

let isDragging = false;

const soundEffect = document.getElementById('sound-effect');


box.addEventListener('dragstart', function(event) {
  console.log('dragstart');
  isDragging = true;
  soundEffect.play();
});

bigBox.addEventListener('dragover', function(event) {
  console.log('dragover');
  event.preventDefault();
});


box.addEventListener('drop', function(event) {
  console.log('drop');
  container.prepend(box);
});


bigBox.addEventListener('dragenter', function(event) {
  console.log('dragenter');
});

bigBox.addEventListener('dragleave', function(event) {
  console.log('dragleave');
  if (isDragging && !bigBox.contains(event.relatedTarget)) {
    container.prepend(box);
  }
});

box.addEventListener('dragend', function(event) {
  console.log('dragend');
  isDragging = false;
  soundEffect.play();
});


const container2 = document.querySelector('#container2');
let circle = document.createElement('div');
circle.classList.add('circle');
container2.appendChild(circle);

// get the position of the mouse
function getMousePosition(event) {
  console.log("mouse position: ",event.clientX, event.clientY);
  const circleWidth = circle.offsetHeight;
  const circleHeight = circle.offsetWidth;
  let x = event.clientX - circleWidth / 2;
  let y = event.clientY - circleHeight / 2;
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';
  console.log("circle position: ",x, y);
}


// move the circle with the mouse
document.addEventListener('mousemove', getMousePosition);

const img = new
