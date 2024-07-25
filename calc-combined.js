let currentSelection = 'digi'; // Set a default value
let priceValues = {};

const digitalTransfersButton = document.querySelector("[data-service='digi']");
const cadcutTransfersButton = document.querySelector("[data-service='cad']");
const digitalTransfersSection = document.querySelector("[data-section='digi']");
const cadcutTransfersSection = document.querySelector("[data-section='cad']");

let widthInput, heightInput, quantityInput, serviceButtons, filterButtons, materialButtons;

function updateGlobalVariables() {
  widthInput = document.querySelector(`[data-width='${currentSelection}']`);
  heightInput = document.querySelector(`[data-height='${currentSelection}']`);
  quantityInput = document.querySelector(`[data-quantity='${currentSelection}']`);
  serviceButtons = document.querySelectorAll(`[data-service='${currentSelection}']`);
  filterButtons = document.querySelectorAll(`[data-filter='${currentSelection}']`);
  materialButtons = document.querySelectorAll(`[data-material='${currentSelection}']`);

  console.log("Adding event listeners to input fields");
  widthInput.addEventListener('input', debounce(() => {
    console.log("widthInput input event fired");
    handleInputChange();
  }, 300));
  heightInput.addEventListener('input', debounce(() => {
    console.log("heightInput input event fired");
    handleInputChange();
  }, 300));
  quantityInput.addEventListener('input', debounce(() => {
    console.log("quantityInput input event fired");
    handleInputChange();
  }, 300));
}

function addClassIfNotExists(element, className) {
  if (!element.classList.contains(className)) {
    element.classList.add(className);
  }
}

function setupActiveClassToggle(buttonClass) {
  const buttons = document.querySelectorAll(`.${buttonClass}`);
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

// Add this new function to reset all active classes
function resetActiveClasses() {
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => element.classList.remove('active'));
}

function setupDimCostVisibility() {
  const dimensionsDivs = document.querySelectorAll('.dimensions');
  const costDivs = document.querySelectorAll('.cost');

  function updateVisibility() {
    const currentMaterialButtons = document.querySelectorAll(`[data-material='${currentSelection}']`);
    console.log(currentMaterialButtons)
    const currentDimensionsDiv = document.querySelector(`.dimensions[data-dimension-type='${currentSelection}']`);
    const currentCostDiv = document.querySelector(`.cost[data-cost-type='${currentSelection}']`);

    dimensionsDivs.forEach(div => div.classList.remove('show'));
    costDivs.forEach(div => div.classList.remove('show'));

    currentMaterialButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (currentDimensionsDiv) {
          currentDimensionsDiv.classList.add('show');
        }
        if (currentCostDiv) {
          currentCostDiv.classList.add('show');
        }
        
        const materialType = button.getAttribute('data-material-type');
        console.log(`Selected ${currentSelection} material type: ${materialType}`);
      });
    });
  }

  updateVisibility();

  // If you want to use the custom event, uncomment this line:
  // document.addEventListener('selectionChanged', updateVisibility);
}

function setupFilterButtons() {
  console.log("Setting up filter buttons for:", currentSelection);
  const filterButtons = document.querySelectorAll(`[data-filter='${currentSelection}']`);
  console.log("Number of filter buttons found:", filterButtons.length);
  
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterType = button.getAttribute("data-filter-type");
      console.log("Filter Button Clicked:", filterType);
      
      if (filterType === null) {
        console.error("data-filter-type is not set for this button:", button);
        return;
      }
      
      filterSelection(filterType);
    });
  });
}

function filterSelection(filterType) {
  console.log("Filtering by:", filterType);
  
  const materialButtons = document.querySelectorAll(`[data-material='${currentSelection}']`);
  console.log("Number of material buttons:", materialButtons.length);

  materialButtons.forEach(button => {
    const buttonMaterialTypes = button.getAttribute('data-material-type').split(' ');
    if (filterType === "all" || buttonMaterialTypes.includes(filterType)) {
      button.classList.add("show");
      console.log("Added 'show' class to:", button);
    } else {
      button.classList.remove("show");
      console.log("Removed 'show' class from:", button);
    }
  });

  console.log("Buttons with 'show' class:", document.querySelectorAll(`[data-material='${currentSelection}'].show`));
}

function debounce(func, delay) {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
}

async function fetchPriceList() {
  console.log(`Fetching ${currentSelection} Price List`);
  try {
    const response = await fetch(`/price_list_${currentSelection}.json`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${currentSelection} price list:`, error);
    return null;
  }
}

async function calculateSize() {
  console.log("Calculating Size");

  const activeButton = document.querySelector(`.active[data-material='${currentSelection}']`);
  console.log(activeButton)

  const priceList = await fetchPriceList();
  if (!priceList) return;

  const materialClass = ["standard", "specialty", "premium"].find(cls =>
    activeButton.classList.contains(cls)
  );
  
  let width = widthInput.value;
  let height = heightInput.value;

  let sizeValue = width * height;
  console.log(sizeValue);
  
    if (currentSelection === 'digi') {
  
      // Custom rounding logic
  if (sizeValue % 1 <= 0.10) {
    sizeValue = Math.floor(sizeValue);
  }
  else {
    sizeValue = Math.ceil(sizeValue);
  }

  const material = priceList[materialClass];
  console.log(material)

  const squareInchRanges = Object.keys(material).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const squareInchRange =
    squareInchRanges.find(range => sizeValue <= parseInt(range)) ||
    squareInchRanges[squareInchRanges.length - 1];
  
  const quantityRanges = material[squareInchRange];
    
  Object.entries(quantityRanges).forEach(([quantityRange, price], index) => {
    const totalPrice = sizeValue * parseFloat(price);
    const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
    const dollarTotalPrice = `$${roundedTotalPrice.toFixed(2)}`;
    console.log(`Total Price for ${quantityRange}: ${dollarTotalPrice}`);
    document.querySelector(`#digi_piece_price_${quantityRange}`).innerText =
      dollarTotalPrice + " " + "each";

    switch (index) {
      case 0:
        this.priceValue1 = dollarTotalPrice;
        break;
      case 1:
        this.priceValue2 = dollarTotalPrice;
        break;
      case 2:
        this.priceValue3 = dollarTotalPrice;
        break;
      case 3:
        this.priceValue4 = dollarTotalPrice;
        break;
      case 4:
        this.priceValue5 = dollarTotalPrice;
        break;
    }
  });
  
priceValues.priceValue1 = dollarTotalPrice;
priceValues.priceValue2 = dollarTotalPrice;
priceValues.priceValue3 = dollarTotalPrice;
priceValues.priceValue4 = dollarTotalPrice;
priceValues.priceValue5 = dollarTotalPrice;

}
else if (currentSelection === 'cad') {
  console.log('currentSelection is cad');
  
  const material = priceList[materialClass];
  console.log('material:', material);
  
  const squareInchRanges = Object.keys(material).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  console.log('squareInchRanges:', squareInchRanges);
  
  let squareInchRange = squareInchRanges[0];
  console.log('initial squareInchRange:', squareInchRange);
  
  for (let i = 0; i < squareInchRanges.length; i++) {
    if (sizeValue > parseInt(squareInchRanges[i])) {
      squareInchRange = squareInchRanges[i];
    } else {
      break;
    }
  }
  console.log('final squareInchRange:', squareInchRange);
  
  const quantityRanges = material[squareInchRange];
  console.log('quantityRanges:', quantityRanges);
  
  Object.entries(quantityRanges).forEach(([quantityRange, price], index) => {
    const totalPrice = price * quantityInput.value;
    const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
    const dollarTotalPrice = `$${roundedTotalPrice.toFixed(2)}`;
    console.log(`Price for ${quantityRange}: ${price}`);
    document.querySelector(`#cad_piece_price_${quantityRange}`).innerText =
      price + " " + "each";

      switch (index) {
        case 0:
          this.priceValue1 = dollarTotalPrice;
          break;
        case 1:
          this.priceValue2 = dollarTotalPrice;
          break;
        case 2:
          this.priceValue3 = dollarTotalPrice;
          break;
        case 3:
          this.priceValue4 = dollarTotalPrice;
          break;
        case 4:
          this.priceValue5 = dollarTotalPrice;
          break;
      }

  console.log(`Total price for ${quantityRange}: ${dollarTotalPrice}`);
  });
  
  priceValues.priceValue1 = dollarTotalPrice;
  priceValues.priceValue2 = dollarTotalPrice;
  priceValues.priceValue3 = dollarTotalPrice;
  priceValues.priceValue4 = dollarTotalPrice;
  priceValues.priceValue5 = dollarTotalPrice;
}
}



function calculateTotalPrice() {
  const calcQuantity = quantityInput.value;

  let priceValue1 = parseFloat(priceValues.priceValue1.replace("$", ""));
  let priceValue2 = parseFloat(priceValues.priceValue2.replace("$", ""));
  let priceValue3 = parseFloat(priceValues.priceValue3.replace("$", ""));
  let priceValue4 = parseFloat(priceValues.priceValue4.replace("$", ""));
  let priceValue5 = parseFloat(priceValues.priceValue5.replace("$", ""));

  // let priceValue1 = parseFloat(this.priceValue1.replace("$", ""));
  // let priceValue2 = parseFloat(this.priceValue2.replace("$", ""));
  // let priceValue3 = parseFloat(this.priceValue3.replace("$", ""));
  // let priceValue4 = parseFloat(this.priceValue4.replace("$", ""));
  // let priceValue5 = parseFloat(this.priceValue5.replace("$", ""));

  let totalPrice;

  if (currentSelection === 'digi') {
    if (calcQuantity <= 24) {
      totalPrice = calcQuantity * priceValue1;
    } else if (calcQuantity <= 74) {
      totalPrice = calcQuantity * priceValue2;
    } else if (calcQuantity <= 249) {
      totalPrice = calcQuantity * priceValue3;
    } else if (calcQuantity <= 499) {
      totalPrice = calcQuantity * priceValue4;
    } else {
      totalPrice = calcQuantity * priceValue5;
    }
    
  console.log(`Total Price: $${totalPrice.toFixed(2)}`);
  }

   else if (currentSelection === 'cad') {
    // Replace this with the correct calculation logic for 'cad'
    if (calcQuantity <= 11) {
      totalPrice = priceValue1;
    } else if (calcQuantity <= 47) {
      totalPrice = priceValue2;
    } else if (calcQuantity <= 95) {
      totalPrice = priceValue3;
    } else if (calcQuantity <= 249) {
      totalPrice = priceValue4;
    } else {
      totalPrice = priceValue5;
    }
    
  console.log(`Total Price: $${totalPrice.toFixed(2)}`);
  }

document.querySelector(`[data-total-price-output='${currentSelection}']`).innerText = `$${totalPrice.toFixed(2)}`;

}


function resetCalculations() {
  this.priceValue1 = null;
  this.priceValue2 = null;
  this.priceValue3 = null;
  this.priceValue4 = null;
  this.priceValue5 = null;

  
  if (currentSelection === 'digi') {
  document.querySelector("#digi_piece_price_1").innerText = "";
  document.querySelector("#digi_piece_price_25").innerText = "";
  document.querySelector("#digi_piece_price_75").innerText = "";
  document.querySelector("#digi_piece_price_250").innerText = "";
  document.querySelector("#digi_piece_price_500").innerText = "";
  document.getElementById("totalPriceOutput").innerText = "";
} else if (currentSelection === 'cad') {
  document.querySelector("#cad_piece_price_1").innerText = "";
  document.querySelector("#cad_piece_price_12").innerText = "";
  document.querySelector("#cad_piece_price_48").innerText = "";
  document.querySelector("#cad_piece_price_96").innerText = "";
  document.querySelector("#cad_piece_price_250").innerText = "";
  document.getElementById("totalPriceOutput").innerText = "";
}

  widthInput.value = "";
  heightInput.value = "";
  quantityInput.value = "";
}

async function handleInputChange() {
  console.log("handleInputChange function called");
  await calculateSize();
  calculateTotalPrice();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");
  
  setupActiveClassToggle('service-btn');
  setupActiveClassToggle('filter-btn');
  setupActiveClassToggle('digi-btn');
  setupActiveClassToggle('cad-btn');

  setupDimCostVisibility();
  setupFilterButtons();
  filterSelection("all");
  updateGlobalVariables();

  digitalTransfersButton.addEventListener("click", () => {
    console.log("Digital Transfers Button Clicked");
    currentSelection = 'digi';
    console.log(currentSelection);
    resetActiveClasses();
    digitalTransfersButton.classList.add('active');
    setupFilterButtons();
    addClassIfNotExists(digitalTransfersSection, "show");
    cadcutTransfersSection.classList.remove("show");
    filterSelection('all');
    updateGlobalVariables();
    setupDimCostVisibility();
  });

  cadcutTransfersButton.addEventListener("click", () => {
    console.log("Cadcut Transfers Button Clicked");
    currentSelection = 'cad';
    console.log(currentSelection);
    resetActiveClasses();
    cadcutTransfersButton.classList.add('active');
    setupFilterButtons();
    addClassIfNotExists(cadcutTransfersSection, "show");
    digitalTransfersSection.classList.remove("show");
    filterSelection('all');
    updateGlobalVariables();
    setupDimCostVisibility();

    // Default the selection to the button with data-color-count='1' and give it the .active class
    const colorButton = document.querySelector("[data-color-count='1']");
    if (colorButton) {
        colorButton.click();
    }
});

console.log("Adding event listeners to input fields");
widthInput.addEventListener('input', () => {
  console.log("widthInput input event fired");
  debounce(handleInputChange, 300);
});
heightInput.addEventListener('input', () => {
  console.log("heightInput input event fired");
  debounce(handleInputChange, 300);
});
quantityInput.addEventListener('input', () => {
  console.log("quantityInput input event fired");
  debounce(handleInputChange, 300);
});
  // widthInput.addEventListener('input', debounce(handleInputChange, 300));
  // heightInput.addEventListener('input', debounce(handleInputChange, 300));
  // quantityInput.addEventListener('input', debounce(handleInputChange, 300));
});