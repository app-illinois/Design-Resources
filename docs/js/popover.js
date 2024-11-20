// Function to generate popover HTML and CSS
function getPopoverHtml(title, content, isLight, position) {
    const themeClass = isLight ? 'popover-light' : 'popover-dark';
    return `
      <div class="popover ${themeClass}" data-position="${position}">
        <div class="popover-arrow"></div>
        <div class="popover-header">
          <span class="popover-title">${title}</span>
          <span class="popover-close">✖</span>
        </div>
        <div class="popover-body">${content}</div>
      </div>
    `;
}

// Function to position the popover
function positionPopover(popover, trigger, position) {
    const rect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const padding = 10;

    switch (position) {
        case 'bottom-left':
            popover.style.top = `${rect.bottom + window.scrollY + padding}px`;
            popover.style.left = `${rect.left + window.scrollX}px`;
            break;
        case 'bottom-right':
            popover.style.top = `${rect.bottom + window.scrollY + padding}px`;
            popover.style.left = `${rect.right + window.scrollX - popoverRect.width}px`;
            break;
        case 'top-left':
            popover.style.top = `${rect.top + window.scrollY - popoverRect.height - padding}px`;
            popover.style.left = `${rect.left + window.scrollX}px`;
            break;
        // Add other positions as needed
        default:
            break;
    }
}

// Function to dismiss all popovers
function dismissAllPopovers() {
    document.querySelectorAll('.popover').forEach(popover => popover.remove());
}

// Initialize popovers
function attachPopovers() {
    const triggers = document.querySelectorAll('[data-popover-title][data-popover-light][data-popover-pos][data-popover-html]');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the dismiss event

            // Dismiss existing popovers
            dismissAllPopovers();

            // Fetch data attributes
            const title = trigger.dataset.popoverTitle;
            const content = trigger.dataset.popoverHtml;
            const isLight = trigger.dataset.popoverLight === 'true';
            const position = trigger.dataset.popoverPos;


            // Create popover HTML
            const popoverHtml = getPopoverHtml(title, content, isLight, position);

            // Insert and position popover
            const popover = document.createElement('div');
            popover.innerHTML = popoverHtml.trim();
            document.body.appendChild(popover.firstChild);
            const createdPopover = document.querySelector('.popover');
            positionPopover(createdPopover, trigger, position);

            // Close button
            createdPopover.querySelector('.popover-close').addEventListener('click', dismissAllPopovers);
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Dismiss popovers on outside click
    document.body.addEventListener('click', dismissAllPopovers);

    // Attach popovers to elements
    attachPopovers();
});
