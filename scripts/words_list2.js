// Select DOM elements
const form = document.querySelector('form');
const wordList = document.getElementById('word-list');
const randomWordDisplay = document.getElementById('random-word-display');
const randomButton = document.querySelector('.random-button');
const previousButton = document.querySelector('.previous-button');
const sortButton = document.getElementById('sort-button');
const reverseButton = document.getElementById('reverse-button');
const clearButton = document.getElementById('clear-button');
const downloadButton = document.getElementById('download');
const uploadInput = document.getElementById('upload');

// Initialize word lists
let allWords = loadWords() || [];
let wordHistory = [];

// Event Listeners
form.addEventListener('submit', submitEventHandler);
wordList.addEventListener('click', deleteWord);
randomButton.addEventListener('click', displayRandomWords);
previousButton.addEventListener('click', displayPreviousWord);
sortButton.addEventListener('click', sortWords);
reverseButton.addEventListener('click', reverseWords);
clearButton.addEventListener('click', clearAllWords);
downloadButton.addEventListener('click', downloadWords);
uploadInput.addEventListener('change', uploadWords);

// Load words from localStorage on page load
function loadWords() {
    const storedWords = localStorage.getItem('words');
    return storedWords ? JSON.parse(storedWords) : null;
}

// Render the word list
function renderWords() {
    wordList.innerHTML = '';
    allWords.forEach(word => addWordToList(word, false));
}

renderWords();

// Submit event handler
function submitEventHandler(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const word = formData.get('word').trim();
    if (word) addWord(word);
    form.reset();
}

// Add a word to the list and update localStorage
function addWord(word) {
    if (!allWords.includes(word)) {
        addWordToList(word);
        allWords.push(word);
        localStorage.setItem('words', JSON.stringify(allWords));
    } else {
        alert('This word is already in the list');
    }
}

// Add a word to the DOM list
function addWordToList(word, updateLocalStorage = true) {
    const newWordElement = document.createElement('li');
    newWordElement.textContent = word;
    wordList.appendChild(newWordElement);
    if (updateLocalStorage) {
        localStorage.setItem('words', JSON.stringify(allWords));
    }
}

// Delete a word from the list
function deleteWord(event) {
    if (event.target.tagName === 'LI') {
        const wordToRemove = event.target.textContent;
        allWords = allWords.filter(word => word !== wordToRemove);
        event.target.remove();
        localStorage.setItem('words', JSON.stringify(allWords));
    }
}

// Display two random words
function displayRandomWords() {
    const randomWord1 = allWords[Math.floor(Math.random() * allWords.length)];
    const randomWord2 = allWords[Math.floor(Math.random() * allWords.length)];
    const combinedWord = `${randomWord1} ${randomWord2}`;
    wordHistory.push(combinedWord);
    if (wordHistory.length > 5) wordHistory.shift();
    randomWordDisplay.textContent = combinedWord;
}

// Display the last word from the history
function displayPreviousWord() {
    if (wordHistory.length > 0) {
        randomWordDisplay.textContent = wordHistory.pop();
    }
}

// Sort the words
function sortWords() {
    allWords.sort();
    renderWords();
}

// Reverse the word list
function reverseWords() {
    allWords.reverse();
    renderWords();
}

// Clear all words
function clearAllWords() {
    allWords = [];
    wordList.innerHTML = '';
    localStorage.setItem('words', JSON.stringify(allWords));
}

// Download the word list as a JSON file
function downloadWords() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allWords));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "words.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Upload and replace the word list with uploaded JSON file
function uploadWords(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            allWords = JSON.parse(contents);
            renderWords();
            localStorage.setItem('words', JSON.stringify(allWords));
            console.log(localStorage.getItem('words'));
        };
        reader.readAsText(file);
    }
}
