fetch('../assets/JSON_data/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const container = document.getElementById('container');
    let currentIndex = 0;

    function updateContent(){
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

      container.appendChild(display);

      currentIndex = (currentIndex + 1) % data.length;

    }

    updateContent();
    // setInterval(updateContent, 1000);
  })
  .catch(error => console.error('Error:', error));

console.log('Hello from network.js');


// voice over

// progress bar

// button to start and stop

// show current index of the word
