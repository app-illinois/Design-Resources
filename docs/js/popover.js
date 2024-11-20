// Function to generate popover HTML and CSS
function getPopoverHtml(title, content, isLight, position) {
    const themeClass = isLight ? 'popover-light' : 'popover-dark';
    return `
      <div class="popover ${themeClass}" data-position="${position}">
        <div class="popover-arrow"></div>
        <div class="popover-header">
          <span class="popover-title">${title}</span>
          <span class="popover-close"><i class="fa fa-solid fa-xmark"></i></span>
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

    // Split position into main position and alignment
    const [mainPosition, alignment] = position.split('-');

    // Calculate positions based on mainPosition
    let top = 0, left = 0;
    switch (mainPosition) {
        case 'bottom':
            top = rect.bottom + window.scrollY + padding;
            left = calculatePopoverX(rect, popoverRect, alignment);
            break;
        case 'top':
            top = rect.top + window.scrollY - popoverRect.height - padding;
            left = calculatePopoverX(rect, popoverRect, alignment);
            break;
        case 'left':
            left = rect.left + window.scrollX - popoverRect.width - padding;
            top = calculatePopoverY(rect, popoverRect, alignment);
            break;
        case 'right':
            left = rect.right + window.scrollX + padding;
            top = calculatePopoverY(rect, popoverRect, alignment);
            break;
        default:
            console.error(`Unexpected main position: '${mainPosition}'`);
            return;
    }

    // Apply calculated positions
    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
}


// Function to dismiss all popovers
function dismissAllPopovers() {
    document.querySelectorAll('.popover').forEach(popover => popover.remove());
}

function calculatePopoverX(rect, popoverRect, alignment) {
    switch (alignment) {
        case 'left':
            return rect.left + window.scrollX;
        case 'middle':
            return rect.left + window.scrollX + (rect.width - popoverRect.width) / 2;
        case 'right':
            return rect.right + window.scrollX - popoverRect.width;
        default:
            console.error(`Unexpected alignment: '${alignment}'`);
            return 0;
    }
}

function calculatePopoverY(rect, popoverRect, alignment) {
    switch (alignment) {
        case 'up':
            return rect.top + window.scrollY;
        case 'middle':
            return rect.top + window.scrollY + (rect.height - popoverRect.height) / 2;
        case 'down':
            return rect.bottom + window.scrollY - popoverRect.height;
        default:
            console.error(`Unexpected alignment: '${alignment}'`);
            return 0;
    }
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
