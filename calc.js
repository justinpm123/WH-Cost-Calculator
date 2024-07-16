// Get the Service Type buttons
const digitalTransfersButton = document.querySelector('#digital_transfers_btn');
const cadcutTransfersButton = document.querySelector('#cadcut_transfers_btn');

// Get the Service sections
const digitalTransfersSection = document.querySelector('#digital_transfers_sec');
const cadcutTransfersSection = document.querySelector('#cadcut_transfers_sec');

// Add click event listener for "digital_transfers_btn"
digitalTransfersButton.addEventListener('click', () => {
    // Remove "HIDE" class from "digital_transfers_sec"
    digitalTransfersSection.classList.remove('HIDE');
    
    // Add "HIDE" class to "cadcut_transfers_sec"
    cadcutTransfersSection.classList.add('HIDE');
});

// Add click event listener for "cadcut_transfers_btn"
cadcutTransfersButton.addEventListener('click', () => {
    // Add "HIDE" class to "digital_transfers_sec"
    digitalTransfersSection.classList.add('HIDE');
    
    // Remove "HIDE" class from "cadcut_transfers_sec"
    cadcutTransfersSection.classList.remove('HIDE');
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
