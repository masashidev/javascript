const gridTable = document.querySelector('#grid-table');

const gridList = []
const gridNumber = 64;

const shuffleButton = document.querySelector('#shuffle-button');
const resetButton = document.querySelector('#reset-button');

function createGrid() {
  for (let i = 0; i < gridNumber; i++) {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  gridItem.setAttribute('draggable', true);
  gridItem.textContent = i;
  gridList.push(gridItem);
}}
function renderGrid() {
  gridList.forEach(gridItem => {
    gridTable.appendChild(gridItem);
  });
}
function shuffleGrid() {
  for (let i = gridList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gridList[i], gridList[j]] = [gridList[j], gridList[i]];
  }
  renderGrid();
}
function resetGrid() {
  gridList.sort((a, b) => a.textContent - b.textContent);
  renderGrid();
  console.log(gridList);
}

function swapGridItem(item1, item2) {
  const item1Index = gridList.indexOf(item1);
  const item2Index = gridList.indexOf(item2);
  [gridList[item1Index], gridList[item2Index]] = [gridList[item2Index], gridList[item1Index]];
  renderGrid();
}
function selectItem(item) {
  if (item.classList.contains('selected')) {
    item.classList.remove('selected');
  }
  else {
    item.classList.add('selected');
  }
}

shuffleButton.addEventListener('click', shuffleGrid);
resetButton.addEventListener('click', resetGrid);
gridTable.addEventListener('click', function(event) {
  const gridItem = event.target;
  selectItem(gridItem);
  if (gridList.filter(item => item.classList.contains('selected')).length === 2) {
    const [item1, item2] = gridList.filter(item => item.classList.contains('selected'));
    swapGridItem(item1, item2);
    item1.classList.remove('selected');
    item2.classList.remove('selected');
  }

});

createGrid();
renderGrid();
