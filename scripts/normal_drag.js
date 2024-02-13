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
  const circleWidth = circle.offsetHeight;
  const circleHeight = circle.offsetWidth;
  let x = event.clientX - circleWidth / 2;
  let y = event.clientY - circleHeight / 2;
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';
}


// move the circle with the mouse
document.addEventListener('mousemove', getMousePosition);

window.onload = function() {
  var img = document.createElement('img');
  img.src = '/assets/images/pointer.png'; // Replace with the path to your image
  img.classList.add('pointer-image'); // Use a class to style the image (size, etc.)
  document.body.appendChild(img); // Append the image to the body or your specific container

  // Function to update the image position based on the mouse position
  function updateImagePosition(event) {
    const pointerWidth = img.offsetWidth;
    const pointerHeight = img.offsetHeight;
    img.style.left = event.pageX - pointerWidth / 2 + 'px';
    img.style.top = event.pageY - pointerHeight / 2 + 'px';

  }

  document.addEventListener('mousemove', updateImagePosition)

}

function pasteImage(event) {
  let img = document.createElement('img');
  img.src = '/assets/images/pointer.png';
  img.classList.add('pointer-image');
  const x = event.clientX - 50;
  const y = event.clientY - 50;
  img.style.left = x + 'px';
  img.style.top = y + 'px';
  document.body.appendChild(img);
}

document.addEventListener('click', pasteImage);


document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    let pointer = document.querySelector('.pointer-image');
    if (pointer) {
      pointer.remove();
    }
    document.removeEventListener('mousemove', updateImagePosition);
    document.removeEventListener('click', pasteImage);
    console.log('Removed pointer image');
  }
});
