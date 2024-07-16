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
    // Remove "hide" class and add "show" class to "digital_transfers_sec"
    digitalTransfersSection.classList.remove('hide');
    addClassIfNotExists(digitalTransfersSection, 'show');
    
    // Add "hide" class and remove "show" class from "cadcut_transfers_sec"
    cadcutTransfersSection.classList.add('hide');
    cadcutTransfersSection.classList.remove('show');
});

// Add click event listener for "cadcut_transfers_btn"
cadcutTransfersButton.addEventListener('click', () => {
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
        // Remove "active" class from other filter buttons
        filterButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('active');
            }
        });
        // Add "active" class to the clicked filter button
        button.classList.add('active');
    });
});

// Add click event listener for .digi-btn
digiButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove "active" class from other digi buttons
        digiButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('active');
            }
        });
        // Add "active" class to the clicked digi button
        button.classList.add('active');
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

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementsByClassName("filter-btns");
var btns = btnContainer.getElementsByClassName("digi-btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}