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
