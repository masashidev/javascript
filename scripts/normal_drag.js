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

box.addEventListener('dragstart', function(event) {
  console.log('dragstart');
  isDragging = true;
});

bigBox.addEventListener('dragover', function(event) {
  console.log('dragover');
  event.preventDefault();
});

bigBox.addEventListener('drop', function(event) {
  console.log('drop');
  bigBox.prepend(box);
  isDragging = false;
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

bigBox.addEventListener('dragend', function(event) {
  console.log('dragend');
  isDragging = false;
});
