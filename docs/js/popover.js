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

    // Split position into main position and alignment
    const [mainPosition, alignment] = position.split('-');

    // Calculate positions based on mainPosition
    let top = 0, left = 0;

    switch (mainPosition) {
        case 'bottom':
            top = rect.bottom + window.scrollY + padding;
            switch (alignment) {
                case 'left':
                    left = rect.left + window.scrollX;
                    break;
                case 'middle':
                    left = rect.left + window.scrollX + (rect.width - popoverRect.width) / 2;
                    break;
                case 'right':
                    left = rect.right + window.scrollX - popoverRect.width;
                    break;
                default:
                    console.error(`Unexpected alignment: '${alignment}' for main position '${mainPosition}'`);
                    return;
            }
            break;

        case 'top':
            top = rect.top + window.scrollY - popoverRect.height - padding;
            switch (alignment) {
                case 'left':
                    left = rect.left + window.scrollX;
                    break;
                case 'middle':
                    left = rect.left + window.scrollX + (rect.width - popoverRect.width) / 2;
                    break;
                case 'right':
                    left = rect.right + window.scrollX - popoverRect.width;
                    break;
                default:
                    console.error(`Unexpected alignment: '${alignment}' for main position '${mainPosition}'`);
                    return;
            }
            break;

        case 'left':
            left = rect.left + window.scrollX - popoverRect.width - padding;
            switch (alignment) {
                case 'up':
                    top = rect.top + window.scrollY;
                    break;
                case 'middle':
                    top = rect.top + window.scrollY + (rect.height - popoverRect.height) / 2;
                    break;
                case 'down':
                    top = rect.bottom + window.scrollY - popoverRect.height;
                    break;
                default:
                    console.error(`Unexpected alignment: '${alignment}' for main position '${mainPosition}'`);
                    return;
            }
            break;

        case 'right':
            left = rect.right + window.scrollX + padding;
            switch (alignment) {
                case 'up':
                    top = rect.top + window.scrollY;
                    break;
                case 'middle':
                    top = rect.top + window.scrollY + (rect.height - popoverRect.height) / 2;
                    break;
                case 'down':
                    top = rect.bottom + window.scrollY - popoverRect.height;
                    break;
                default:
                    console.error(`Unexpected alignment: '${alignment}' for main position '${mainPosition}'`);
                    return;
            }
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
