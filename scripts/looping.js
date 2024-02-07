const sentences = {
  0: 'This is the first sentence',
  1: 'This is the second sentence',
  2: 'This is the third sentence',
  3: 'This is the fourth sentence',
  4: 'This is the fifth sentence',
};
let sentenceIndex = 0;
let sentence = sentences[sentenceIndex];
let intervalForSentences;
function changeSentences() {
  let sentenceDisplay = document.querySelector('.sentence-display')
  sentenceDisplay.textContent = sentence;
  sentenceIndex = (sentenceIndex + 1) % 5;
  sentence = sentences[sentenceIndex];
  console.log('sentence:', sentence);
}
document.addEventListener('DOMContentLoaded', () => {
  changeSentences();
  intervalForSentences = setInterval(changeSentences, 2000);
  console.log('DOM fully loaded and parsed');
});

const stopButton = document.querySelector('.stop-button');
stopButton.addEventListener('click', () => {
  clearInterval(intervalForSentences);
  console.log('Interval stopped');
});
const startButtion = document.querySelector('.start-button');
startButtion.addEventListener('click', () => {
  intervalForSentences = setInterval(changeSentences, 2000);
  console.log('Interval started');
});


const hoverElement = document.querySelector('.hover-element');
let interval;
let isColorOne = true;
let colorIndex = 0;
let colors = ['#944E63', '#B47B84', '#CAA6A6'];
hoverElement.addEventListener('mouseover', () => {
  interval = requestAnimationFrame(() => {
    hoverElement.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    console.log('colorIndex', colorIndex);
  }, 1000);
});
hoverElement.addEventListener('mouseout', () => {
  clearInterval(interval);
  hoverElement.style.backgroundColor = '#99BC85';
});


let counter = localStorage.getItem('counter');
if (counter === null) {
  counter = 0;
} else {
  counter = parseInt(counter);
}
document.querySelector('.display-counter').textContent = counter;
console.log(counter);
document.querySelector('.counter-button').addEventListener('click', incrementCounter);
document.querySelector('.counter-button').addEventListener('mouseout', () => {
  counter--;
  localStorage.setItem('counter', counter);
  document.querySelector('.display-counter').textContent = counter;
});
function incrementCounter() {
  counter++;
  localStorage.setItem('counter', counter);
  document.querySelector('.display-counter').textContent = counter;
}
document.querySelector('.show-counter').addEventListener('click', () => {
  counter++;
  localStorage.setItem('counter', counter);
  document.querySelector('.display-counter').textContent = counter;
});



const input = document.querySelector('.word-input');
const word = input.value;
const wordList = document.querySelector('.word-list');
const button = document.querySelector('button');

function addWordToList() {
  const word = input.value;
  const listItem = document.createElement('li');
  listItem.textContent = word;
  wordList.appendChild(listItem);
  input.value = '';
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function displayRandomNumber() {
  const randomNumberElement = document.querySelector('.js-random-number');
  const randomNumber = generateRandomNumber();
  randomNumberElement.textContent = randomNumber;
}
function changeButtonContent() {
  let button = document.querySelector('.js-random-number-button');
  const randomNumber = generateRandomNumber();
  button.backgroundColor = 'red';
}
function matchButtonSizeWithNumber() {
  button.style.fontSize = `${randomNumber}px`;
}
function handleButtonEvent() {
  generateRandomNumber();
  displayRandomNumber();
  changeButtonContent();
  matchButtonSizeWithNumber();
}
