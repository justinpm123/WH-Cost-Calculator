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
