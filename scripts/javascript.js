// Create a new paragraph element
function createParagraph() {
  let newParagraph = document.createElement('li');
  newParagraph.textContent = 'This is a new paragraph.';

  // Select the container div
  let buttonResult = document.getElementById('button-result');

  // Append the new paragraph as the last child of the container
  buttonResult.appendChild(newParagraph);
  countSentences();
}

function reset() {
  let buttonResult = document.getElementById('button-result');
  buttonResult.textContent = '';
  countSentences();
}

function countSentences() {
  let count = document.getElementById('count');
  let elementAmount = document.getElementById('button-result').childElementCount;
  count.textContent = elementAmount;
}

function insertingHtml() {
  let wholeHtml = document.body.innerHTML
  let insertingHtml = document.getElementById('inserting-html');
  insertingHtml.textContent = wholeHtml;
}

function randamizedNumber() {
  let number = Math.floor(Math.random() * 100);
  return number;
}

function updateGridNumber(event) {
  event.target.textContent = randamizedNumber();
}

let gridItems = document.querySelectorAll('.grid-item');
console.log(gridItems);

girdItems.forEach(function(gridItem) {
  gridItem.addEventListener('click', updateGridNumber);
});

function displayInputValue() {
  let input = event.key;
  let result = document.querySelector('.variable-input-result');
  result.textContent = input;
}

function appendInputHistory() {
  let input = event.key;
  let historyBox = document.querySelector('.history-box');
  let history = document.getElementById('input-history');
  history.textContent += input;
  console.log(history.textContent);
}

function handleKeyDown(event) {
  displayInputValue();
  appendInputHistory();
}
