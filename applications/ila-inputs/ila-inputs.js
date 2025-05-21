function toggleButtonState(button) {
    const isPressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', !isPressed);
}

// Add event listeners to all buttons within .ila-toggles that are not disabled
document.querySelectorAll('.ila-input-group button[aria-pressed]:not([disabled])').forEach(button => {
    button.addEventListener('click', function () {
        toggleButtonState(this);
    });
});