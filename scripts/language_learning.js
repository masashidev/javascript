const wordsData = [
  { german: 'ich', english: 'I' },
  { german: 'du', english: 'you' },
  { german: 'er', english: 'he' },
  { german: 'sie', english: 'she' },
  { german: 'es', english: 'it' },
]

const tableBody = document.getElementById('table-body');

function generateWordPairHTML(wordsData) {
  return wordsData.map((wordPair, index) => `
    <tr>
      <td>${wordPair.german}</td>
      <td>${wordPair.english}</td>
      <td><button class="delete-button" data-index="${index}">X</button></td>
    </tr>
  `).join('');
}

function updateTable() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = generateWordPairHTML(wordsData);
}

updateTable();

const addButton = document.getElementById('add-button');

addButton.addEventListener('click', function(event) {
  event.preventDefault();
  const englishInput = document.getElementById('english-input').value;
  const germanInput = document.getElementById('german-input').value;
  if (englishInput && germanInput) {
    wordsData.push({
      english: englishInput,
      german: germanInput,
    });
  updateTable();
  document.getElementById('english-input').value = '';
  document.getElementById('german-input').value = '';
  } else {
    alert('Please fill in both fields');
  }
} );

document.getElementById('table-body').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    const index = event.target.getAttribute('data-index');
    wordsData.splice(index, 1);
    updateTable();
  }});
