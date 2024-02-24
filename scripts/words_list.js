const form = document.querySelector('form');
const wordList = document.getElementById('word-list');
let allWords = [];
const randomWordDisplay = document.getElementById('random-word-display');

let wordHistory = [];


// function initiateWords() {
//   fetch('../node/keywords.json')
//     .then(response => response.json())
//     .then(data => {
//       allWords = data;
//       allWords.forEach(word => {
//         addWord(word);
//       }
//       );
//     }
//     )
//     .catch(error => console.error('Error:', error));
// }

// initiateWords();


form.addEventListener('submit', (event) => {
  submitEventHandler(event);
});

function submitEventHandler(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = formData.get('word');
  addWord(data);
  form.reset();
}

function addWord(word) {
  const newWord = document.createElement('li');
  newWord.textContent = word;
  // if (allWords.includes(word)) {
  //   alert('This word is already in the list');
  //   return;
  // }
  wordList.appendChild(newWord);
  allWords.push(word);
}

wordList.addEventListener('click', (event) => {
  deleteWord(event);
}
);

function deleteWord(event) {
  if (event.target.tagName === 'LI') {
    event.target.remove();
    const word = event.target.textContent;
    const index = allWords.indexOf(word);
    allWords.splice(index, 1);
  }
}

const randomButton = document.querySelector('.random-button');

randomButton.addEventListener('click', () => {
  const randomWord1 = allWords[Math.floor(Math.random() * allWords.length)];
  const randomWord2 = allWords[Math.floor(Math.random() * allWords.length)];
  const CombinedWord = `${randomWord1} ${randomWord2}`;
  wordHistory.push(CombinedWord);
  if (wordHistory.length > 5) {
    wordHistory.shift();
  }
  randomWordDisplay.textContent = CombinedWord;

});

const previousButton = document.querySelector('.previous-button');
previousButton.addEventListener('click', () => {
  if (wordHistory.length > 0) {
    randomWordDisplay.textContent = wordHistory.pop();
  }
});




document.getElementById('download').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allWords));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "words.json");
  document.body.appendChild(downloadAnchorNode); // Required for Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});

document.getElementById('upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const contents = e.target.result;
      const words = JSON.parse(contents);
      // Clear the current list and UI
      allWords = [];
      wordList.innerHTML = '';
      // Add the uploaded words
      words.forEach(addWord);
    };
    reader.readAsText(file);
  }
});

document.getElementById('sort-button').addEventListener('click', () => {
  allWords.sort();
  wordList.innerHTML = '';
  allWords.forEach(addWord);
}
);

document.getElementById('reverse-button').addEventListener('click', () => {
  allWords.reverse();
  wordList.innerHTML = '';
  allWords.forEach(addWord);
});

document.getElementById('clear-button').addEventListener('click', () => {
  allWords = [];
  wordList.innerHTML = '';
});

