// Get the buttons
const digitalTransfersButton = document.querySelector('#digital_transfers_btn');
const cadcutTransfersButton = document.querySelector('#cadcut_transfers_btn');

// Get the sections
const digitalTransfersSection = document.querySelector('#digital_transfers_sec');
const cadcutTransfersSection = document.querySelector('#cadcut_transfers_sec');

// Function to add a class if it doesn't exist
function addClassIfNotExists(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

// Add click event listener for "digital_transfers_btn"
digitalTransfersButton.addEventListener('click', () => {
    console.log('Digital Transfers Button Clicked');
    // Remove "hide" class and add "show" class to "digital_transfers_sec"
    digitalTransfersSection.classList.remove('hide');
    addClassIfNotExists(digitalTransfersSection, 'show');
    
    // Add "hide" class and remove "show" class from "cadcut_transfers_sec"
    cadcutTransfersSection.classList.add('hide');
    cadcutTransfersSection.classList.remove('show');
});

// Add click event listener for "cadcut_transfers_btn"
cadcutTransfersButton.addEventListener('click', () => {
    console.log('Cadcut Transfers Button Clicked');
    // Add "hide" class and remove "show" class to "digital_transfers_sec"
    digitalTransfersSection.classList.add('hide');
    digitalTransfersSection.classList.remove('show');
    
    // Remove "hide" class and add "show" class from "cadcut_transfers_sec"
    cadcutTransfersSection.classList.remove('hide');
    addClassIfNotExists(cadcutTransfersSection, 'show');
});

// Get all buttons with class .filter-btn
const filterButtons = document.querySelectorAll('.filter-btn');
const digiButtons = document.querySelectorAll('.digi-btn');

// Add click event listener for .filter-btn
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Filter Button Clicked');
        // Remove "active" class from other filter buttons
        filterButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('active');
            }
        });
        // Add "active" class to the clicked filter button
        button.classList.add('active');

        // Call calculateSize function when activeButton changes
        calculateSize();
    });
});

// Add click event listener for .digi-btn
digiButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Digi Button Clicked');
        // Remove "active" class from other digi buttons
        digiButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('active');
            }
        });
        // Add "active" class to the clicked digi button
        button.classList.add('active');

        // Call calculateSize function when activeButton changes
        calculateSize();
    });
});

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("digi-btn");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add an event listener to the digi-btn
document.querySelector('.digi-btn').addEventListener('click', function() {
  console.log('Digi-btn Clicked');
  // Get the div element with the class 'digi-dimensions'
  const digiDimensions = document.querySelector('.digi-dimensions');
  
  // Add the 'show' class to the div
  digiDimensions.classList.add('show');
});

// Width x height x $
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');

// Fetch the price list
async function fetchPriceList() {
  console.log('Fetching Price List');
  const response = await fetch('/price_list.json');
  return await response.json();
}

// Modify the calculateSize function
async function calculateSize() {
  console.log('Calculating Size');
  let width = widthInput.value;
  let height = heightInput.value;

  // Multiply the width and height
  let value = width * height;

  // Convert the result to a float and round to the nearest hundredth
  value = Math.round(value);

  // Fetch the price list
  const priceList = await fetchPriceList();

  // Get the active button
  const activeButton = document.querySelector('.active.digi-btn');

  // Get the material class
  const materialClass = ['standard', 'specialty', 'premium'].find(cls => activeButton.classList.contains(cls));

  // Get the material from the price list
  const material = priceList[materialClass];

 // Find the square inch range
const squareInchRanges = Object.keys(material).sort((a, b) => parseInt(a) - parseInt(b));
const squareInchRange = squareInchRanges.find(range => value <= parseInt(range)) || squareInchRanges[squareInchRanges.length - 1];

  // Get the quantity ranges
  const quantityRanges = material[squareInchRange];

  // Calculate and log the prices
  Object.entries(quantityRanges).forEach(([quantityRange, price]) => {
      const totalPrice = value * parseFloat(price);
      const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
      const dollarTotalPrice = `$${roundedTotalPrice.toFixed(2)}`;
      console.log(`Total Price for ${quantityRange}: ${dollarTotalPrice}`);
      document.querySelector(`q${quantityRange}_piece_price`).innerText = dollarTotalPrice;
  });
}

widthInput.addEventListener('change', calculateSize);
heightInput.addEventListener('change', calculateSize);