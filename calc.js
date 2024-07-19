// Debounce function
function debounce(func, delay) {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
}

// Get the input elements
const digiWidthInput = document.querySelector("#digiWidth");
const digiHeightInput = document.querySelector("#digiHeight");
const digiQuantityInput = document.querySelector("#digiQuantityInput");

// Add 'input' event listener to the input elements
digiWidthInput.addEventListener('input', debounce(async () => {
  await calculateSize();
  calculateTotalPrice();
}, 300));

digiHeightInput.addEventListener('input', debounce(async () => {
  await calculateSize();
  calculateTotalPrice();
}, 300));

digiQuantityInput.addEventListener('input', debounce(async () => {
  await calculateSize();
  calculateTotalPrice();
}, 300));

// Get the buttons
const digitalTransfersButton = document.querySelector("#digital_transfers_btn");
const cadcutTransfersButton = document.querySelector("#cadcut_transfers_btn");
// const calcSubmitButton = document.querySelector("#calcSubmit");
// const calcQtyButton = document.querySelector("#calcQtySubmit");
// Declare the constant variables to store the values
let digiPriceValue1;
let digiPriceValue25;
let digiPriceValue75;
let digiPriceValue250;
let digiPriceValue500;
// Get the sections
const digitalTransfersSection = document.querySelector("#digital_transfers_sec");
const cadcutTransfersSection = document.querySelector("#cadcut_transfers_sec");

// Function to add a class if it doesn't exist
function addClassIfNotExists(element, className) {
  if (!element.classList.contains(className)) {
    element.classList.add(className);
  }
}

// Add click event listener for "digital_transfers_btn"
digitalTransfersButton.addEventListener("click", () => {
  console.log("Digital Transfers Button Clicked");
  // Remove "hide" class and add "show" class to "digital_transfers_sec"
  digitalTransfersSection.classList.remove("hide");
  addClassIfNotExists(digitalTransfersSection, "show");

  // Add "hide" class and remove "show" class from "cadcut_transfers_sec"
  cadcutTransfersSection.classList.add("hide");
  cadcutTransfersSection.classList.remove("show");
});

// Add click event listener for "cadcut_transfers_btn"
cadcutTransfersButton.addEventListener("click", () => {
  console.log("Cadcut Transfers Button Clicked");
  // Add "hide" class and remove "show" class to "digital_transfers_sec"
  digitalTransfersSection.classList.add("hide");
  digitalTransfersSection.classList.remove("show");

  // Remove "hide" class and add "show" class from "cadcut_transfers_sec"
  cadcutTransfersSection.classList.remove("hide");
  addClassIfNotExists(cadcutTransfersSection, "show");
});

// Get all buttons each with their class
const serviceButtons = document.querySelectorAll(".service-btn");
const filterButtons = document.querySelectorAll(".filter-btn");
const digiButtons = document.querySelectorAll(".digi-btn");

// Add click event listener for .service-btn
serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Service Button Clicked");

    // Run the resetCalculations function
    resetCalculations();
    filterSelection("all")

    // Remove "active" class from all filter buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Remove "active" class from all digi buttons
    digiButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Remove "active" class from all service buttons
    serviceButtons.forEach((btn) => {
      if (btn !== button) {
        btn.classList.remove("active");
      }
    });

    // Add "active" class to the clicked filter button
    button.classList.add("active");

  });
});

// Add click event listener for .filter-btn
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Filter Button Clicked");
    // Remove "active" class from other filter buttons
    filterButtons.forEach((btn) => {
      if (btn !== button) {
        btn.classList.remove("active");
      }
    });
    // Add "active" class to the clicked filter button
    button.classList.add("active");

  });
});

// Add click event listener for each .digi-btn
digiButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    console.log("Digi Button Clicked");

    // Remove "active" class from other digi buttons
    digiButtons.forEach((btn) => {
      if (btn !== button) {
        btn.classList.remove("active");
      }
    });

    // Add "active" class to the clicked digi button
    button.classList.add("active");

    // Get the div element with the class 'digi-dimensions'
    const digiDimensions = document.querySelector(".digi-dimensions");

    // Add the 'show' class to the div
    digiDimensions.classList.add("show");

    // Get the div element with the class 'digi-dimensions'
    const digiCost = document.querySelector(".digi-cost");

    // Add the 'show' class to the div
    digiCost.classList.add("show");

    // Run the calculateSize function again to return a new set of prices
    await calculateSize();
    calculateTotalPrice();
  });
});


filterSelection("all");
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

// Fetch the price list
async function fetchDigiPriceList() {
  console.log("Fetching Price List");
  const response = await fetch("/price_list.json");
  return await response.json();
}

let digiQuantity; // Declare quantity as a global variable
let digiQuantityRanges; // Declare quantityRanges as a global variable

// Modify the calculateSize function
async function calculateSize() {
  console.log("Calculating Size");
  let width = digiWidthInput.value;
  let height = digiHeightInput.value;

  // Multiply the width and height
  let digiValue = width * height;
  console.log(digiValue);

  // Convert the result to a float and round to the nearest hundredth
  digiValue = Math.round(digiValue);
  console.log(digiValue);
  
  // Fetch the price list
  const digiPriceList = await fetchDigiPriceList();

  // Get the active button
  const activeButton = document.querySelector(".active.digi-btn");

  // Get the material class
  const materialClass = ["standard", "specialty", "premium"].find(cls =>
    activeButton.classList.contains(cls)
  );

  // Get the material from the price list
  const material = digiPriceList[materialClass];

  // Find the square inch range
  const digiSquareInchRanges = Object.keys(material).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const digiSquareInchRange =
    digiSquareInchRanges.find(range => digiValue <= parseInt(range)) ||
    digiSquareInchRanges[digiSquareInchRanges.length - 1];

  // Get the quantity ranges
  const digiQuantityRanges = material[digiSquareInchRange];

  // Calculate and log the prices
  Object.entries(digiQuantityRanges).forEach(([digiQuantityRange, price], index) => {
    const digiTotalPrice = digiValue * parseFloat(price);
    const digiRoundedTotalPrice = Math.round(digiTotalPrice * 100) / 100;
    const digiDollarTotalPrice = `$${digiRoundedTotalPrice.toFixed(2)}`;
    console.log(`Total Price for ${digiQuantityRange}: ${digiDollarTotalPrice}`);
    document.querySelector(`#digi_${digiQuantityRange}_piece_price`).innerText =
      digiDollarTotalPrice + " " + "each";

    // Store the price values in the constant variables
    switch (index) {
      case 0:
        digiPriceValue1 = digiDollarTotalPrice;
        break;
      case 1:
        digiPriceValue25 = digiDollarTotalPrice;
        break;
      case 2:
        digiPriceValue75 = digiDollarTotalPrice;
        break;
      case 3:
        digiPriceValue250 = digiDollarTotalPrice;
        break;
      case 4:
        digiPriceValue500 = digiDollarTotalPrice;
        break;
    }
  });

  digiQuantity = digiQuantityInput.value; // Assign value to quantity
}

function calculateTotalPrice() {
  // Get the quantity from the input
  digiQuantity = document.querySelector("#digiQuantityInput").value;

  // Convert the price values from strings to numbers
  let digiPrice1 = parseFloat(digiPriceValue1.replace("$", ""));
  let digiPrice25 = parseFloat(digiPriceValue25.replace("$", ""));
  let digiPrice75 = parseFloat(digiPriceValue75.replace("$", ""));
  let digiPrice250 = parseFloat(digiPriceValue250.replace("$", ""));
  let digiPrice500 = parseFloat(digiPriceValue500.replace("$", ""));

  // Calculate the total price based on the quantity
  let digiTotalPrice;
  if (digiQuantity <= 24) {
    digiTotalPrice = digiQuantity * digiPrice1;
  } else if (digiQuantity <= 74) {
    digiTotalPrice = digiQuantity * digiPrice25;
  } else if (digiQuantity <= 249) {
    digiTotalPrice = digiQuantity * digiPrice75;
  } else if (digiQuantity <= 499) {
    digiTotalPrice = digiQuantity * digiPrice250;
  } else {
    digiTotalPrice = digiQuantity * digiPrice500;
  }

  // Log the total price
  console.log(`Total Price: $${digiTotalPrice.toFixed(2)}`);
  document.getElementById("digiTotalPriceOutput").innerText = `$${digiTotalPrice.toFixed(2)}`;
}
function resetCalculations() {
  // Reset the size and price calculations
  digiPriceValue1 = null;
  digiPriceValue25 = null;
  digiPriceValue75 = null;
  digiPriceValue250 = null;
  digiPriceValue500 = null;

  // Clear the displayed values
  document.querySelector("#digi_1_piece_price").innerText = "";
  document.querySelector("#digi_25_piece_price").innerText = "";
  document.querySelector("#digi_75_piece_price").innerText = "";
  document.querySelector("#digi_250_piece_price").innerText = "";
  document.querySelector("#digi_500_piece_price").innerText = "";
  document.getElementById("digiTotalPriceOutput").innerText = "";

  // Reset the input elements
  document.getElementById("digiWidth").value = "";
  document.getElementById("digiHeight").value = "";
  document.getElementById("digiQuantityInput").value = "";

}