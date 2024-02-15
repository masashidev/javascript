document.addEventListener('DOMContentLoaded', function() {
  let header = document.createElement('div');
  header.style.position = 'absolute';
  header.style.top = '0';
  header.style.left = '300px';
  header.innerHTML = "<a href='page_list.html'>Page List</a>";
  header.classList.add('header');
  let firstChild = document.body.firstChild;
  document.body.insertBefore(header, firstChild);
});

console.log('Hello from header.js');
