// Step 1: Select the main list
const mainList = document.getElementById('main-list');

// Step 2: Iterate over each list item and extract data
const items = Array.from(mainList.children).map(li => {
  // Extracting data from each <div> within a <li>
  const vocab = li.querySelector('.vocab').innerText;
  const pos = li.querySelector('.pos').innerText;
  const definition = li.querySelector('.definition').innerText;

  // Creating an object for each list item
  const itemObject = {
    vocab,
    pos: pos.replace(/[\[\]]/g, ''), // Removing square brackets from the pos string
    definition: definition.replace(/[()]/g, '') // Removing parentheses from the definition string
  };

  // Optionally, add extra information if present (like the additional <p> in the last <li>)
  const extraInfo = li.querySelector('p');
  if (extraInfo) {
    itemObject.extraInfo = extraInfo.innerText;
  }

  return itemObject;
});

// Now `items` is an array of objects, each representing an item from the list

// Convert the items array to a JSON string if needed
const jsonItems = JSON.stringify(items);
const itemCount = items.length;
console.log(itemCount);

// function downloadJSON(data, filename = 'data.json') {
//     const blob = new Blob([data], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// }

// downloadJSON(jsonItems); // This will trigger the download of the 'data.json' file
