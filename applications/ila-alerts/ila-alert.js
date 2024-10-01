/*  Accessiblity adapted from https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/examples/alertdialog/ */
('use strict');

var aria = aria || {};

aria.Utils = aria.Utils || {};

window.openAlert = function (dialogId) {
    new aria.Dialog(dialogId);
};

window.closeAlert = function () {
    aria.openedDialog.close();
}; // end closeDialog

/**
 * @description Set focus on descendant nodes until the first focusable element is
 *       found.
 * @param element
 *          DOM node for which to find the first focusable descendant.
 * @returns {boolean}
 *  true if a focusable element is found and focus is set.
 */
aria.Utils.focusFirstDescendant = function (element) {
    for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        if (
            aria.Utils.attemptFocus(child) ||
            aria.Utils.focusFirstDescendant(child)
        ) {
            return true;
        }
    }
    return false;
}; // end focusFirstDescendant

/**
 * @description Set Attempt to set focus on the current node.
 * @param element
 *          The node to attempt to focus on.
 * @returns {boolean}
 *  true if element is focused.
 */
aria.Utils.attemptFocus = function (element) {
    if (!aria.Utils.isFocusable(element)) {
        return false;
    }

    aria.Utils.IgnoreUtilFocusChanges = true;
    try {
        element.focus();
    } catch (e) {
        // continue regardless of error
    }
    aria.Utils.IgnoreUtilFocusChanges = false;
    return document.activeElement === element;
}; // end attemptFocus

aria.handleEscape = function (event) {
    var key = event.which || event.keyCode;

    if (key === aria.KeyCode.ESC && aria.openedDialog) {
        aria.openedDialog.close();
        event.stopPropagation();
    }
};

document.addEventListener('keyup', aria.handleEscape);

/**
 * @class
 * @description Dialog object providing modal focus management.
 *
 * Assumptions: The element serving as the dialog container is present in the
 * DOM and hidden. The dialog container has role='dialog'.
 * @param dialogId
 *          The ID of the element serving as the dialog container.
 */
aria.Dialog = function (dialogId) {
    this.dialogNode = document.getElementById(dialogId);
    if (this.dialogNode === null) {
        throw new Error('No element found with id="' + dialogId + '".');
    }

    var validRoles = ['dialog', 'alertdialog'];
    var isDialog = (this.dialogNode.getAttribute('role') || '')
        .trim()
        .split(/\s+/g)
        .some(function (token) {
            return validRoles.some(function (role) {
                return token === role;
            });
        });
    if (!isDialog) {
        throw new Error(
            'Dialog() requires a DOM element with ARIA role of dialog or alertdialog.'
        );
    }

    // Disable scroll on the body element
    document.body.classList.add(aria.Utils.dialogOpenClass);

    // Bracket the dialog node with two invisible, focusable nodes.
    // While this dialog is open, we use these to make sure that focus never
    // leaves the document even if dialogNode is the first or last node.
    var preDiv = document.createElement('div');
    this.preNode = this.dialogNode.parentNode.insertBefore(
        preDiv,
        this.dialogNode
    );
    this.preNode.tabIndex = 0;
    var postDiv = document.createElement('div');
    this.postNode = this.dialogNode.parentNode.insertBefore(
        postDiv,
        this.dialogNode.nextSibling
    );
    this.postNode.tabIndex = 0;

    this.addListeners();
    aria.openedDialog = this;
    this.dialogNode.classList.add('ila-alert--open'); // make visible
    this.dialogNode.classList.remove('ila-alert--closed');
    this.lastFocus = document.activeElement;
}; // end Dialog constructor

/**
 * @description
 *  Hides the current top dialog,
 *  removes listeners of the top dialog,
 *  restore listeners of a parent dialog if one was open under the one that just closed
 */
aria.Dialog.prototype.close = function () {
    aria.openedDialog = null;
    this.removeListeners();
    aria.Utils.remove(this.preNode);
    aria.Utils.remove(this.postNode);
    this.dialogNode.classList.add('ila-alert--closed');
    this.dialogNode.classList.remove('ila-alert--open');

    document.body.classList.remove(aria.Utils.dialogOpenClass);
}; // end close

aria.Dialog.prototype.addListeners = function () {
    document.addEventListener('focus', this.trapFocus, true);
}; // end addListeners

aria.Dialog.prototype.removeListeners = function () {
    document.removeEventListener('focus', this.trapFocus, true);
}; // end removeListeners

aria.Dialog.prototype.trapFocus = function (event) {
    if (aria.Utils.IgnoreUtilFocusChanges) {
        return;
    }
    var opened = aria.openedDialog;
    if (opened.dialogNode.contains(event.target)) {
        opened.lastFocus = event.target;
    } else {
        aria.Utils.focusFirstDescendant(opened.dialogNode);
        if (opened.lastFocus == document.activeElement) {
            aria.Utils.focusLastDescendant(opened.dialogNode);
        }
        opened.lastFocus = document.activeElement;
    }
}; // end trapFocus

('use strict');
/**
 * @namespace aria
 */

var aria = aria || {};

/**
 * @description
 *  Key code constants
 */
aria.KeyCode = {
    BACKSPACE: 8,
    TAB: 9,
    RETURN: 13,
    SHIFT: 16,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
};

aria.Utils = aria.Utils || {};

aria.Utils.IgnoreUtilFocusChanges = false;
aria.Utils.dialogOpenClass = 'ila-body--has-dialog';

// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
aria.Utils.matches = function (element, selector) {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = element.parentNode.querySelectorAll(s);
                var i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                    // empty
                }
                return i > -1;
            };
    }

    return element.matches(selector);
};

aria.Utils.remove = function (item) {
    if (item.remove && typeof item.remove === 'function') {
        return item.remove();
    }
    if (
        item.parentNode &&
        item.parentNode.removeChild &&
        typeof item.parentNode.removeChild === 'function'
    ) {
        return item.parentNode.removeChild(item);
    }
    return false;
};

aria.Utils.isFocusable = function (element) {
    if (element.tabIndex < 0) {
        return false;
    }

    if (element.disabled) {
        return false;
    }

    switch (element.nodeName) {
        case 'A':
            return !!element.href && element.rel != 'ignore';
        case 'INPUT':
            return element.type != 'hidden';
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
            return true;
        default:
            return false;
    }
};

aria.Utils.getAncestorBySelector = function (element, selector) {
    if (!aria.Utils.matches(element, selector + ' ' + element.tagName)) {
        // Element is not inside an element that matches selector
        return null;
    }

    // Move up the DOM tree until a parent matching the selector is found
    var currentNode = element;
    var ancestor = null;
    while (ancestor === null) {
        if (aria.Utils.matches(currentNode.parentNode, selector)) {
            ancestor = currentNode.parentNode;
        } else {
            currentNode = currentNode.parentNode;
        }
    }

    return ancestor;
};

aria.Utils.hasClass = function (element, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(
        element.className
    );
};

aria.Utils.addClass = function (element, className) {
    if (!aria.Utils.hasClass(element, className)) {
        element.className += ' ' + className;
    }
};

aria.Utils.removeClass = function (element, className) {
    var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
    element.className = element.className.replace(classRegex, ' ').trim();
};

aria.Utils.bindMethods = function (object /* , ...methodNames */) {
    var methodNames = Array.prototype.slice.call(arguments, 1);
    methodNames.forEach(function (method) {
        object[method] = object[method].bind(object);
    });
};
