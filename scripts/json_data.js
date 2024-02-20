fetch('../assets/JSON_data/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const smallList = document.getElementById('small-list');


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
    // setInterval(updateContent, 3000);
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


// function addDanmakuMessage(message) {
//   const container = document.getElementById('danmakuContainer');
//   const newMessage = document.createElement('div');
//   newMessage.classList.add('danmaku');
//   newMessage.textContent = message;

//   const yPos = Math.random() * (container.offsetHeight - 20);
//   newMessage.style.top = `${yPos}px`;

//   const duration = 5 + Math.random() * 5;
//   newMessage.style.animation = `move ${duration}s linear`;

//   container.appendChild(newMessage);

//   newMessage.addEventListener('animationend', () => {
//     container.removeChild(newMessage);
//   });

// }

// addDanmakuMessage('Hello World!');

// voice over

// progress bar

// button to start and stop

// show current index of the word
