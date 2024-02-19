fetch('../assets/JSON_data/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const container = document.getElementById('container');
    let currentIndex = 0;

    function updateContent(){

      container.classList.toggle('fade-out');

      setTimeout(() => {

      container.innerHTML = '';
      const item = data[currentIndex];
      const display = document.createElement('div');
      display.classList.add('display');
      display.innerHTML = `
      <div id="vocab"> ${item.vocab} </div>
      <div class="pos"> ${item.pos} </div>
      <div class="definition"> ${item.definition} </div>
      `;

      if (item.extraInfo) {
        const p = document.createElement('p');
        p.textContent = item.extraInfo;
        display.appendChild(p);
      }

      const current = document.createElement('div');
      current.classList.add('current');
      current.textContent = `${currentIndex + 1} / ${data.length}`;
      container.appendChild(current);

      container.appendChild(display);

      container.classList.toggle('fade-out');

      currentIndex = (currentIndex + 1) % data.length;
      }, 500);
    }

    updateContent();
    setInterval(updateContent, 3000);
  })
  .catch(error => console.error('Error:', error));

console.log('Hello from network.js');


const target = document.getElementById('target');
target.addEventListener('click', () => {
  console.log('click');
  target.classList.toggle('target-clicked');
  setInterval(() => {
    target.classList.toggle('target-clicked');
  }, 200);
} );

// voice over

// progress bar

// button to start and stop

// show current index of the word
