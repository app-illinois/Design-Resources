function openToast(toastId) {
    let toast = document.getElementById(toastId);
    toast.classList.remove('ila-toast--closed');
    toast.classList.add('ila-toast--open');

    // remove property from older elements so newest element appears on bottom
    const olderElements = document.querySelectorAll('.ila-toast--first');
    olderElements.forEach((element) => {
        element.classList.remove('ila-toast--first');
    });
    toast.classList.add('ila-toast--first');
    manageAutoclose(toastId);
}

function closeToast(toastId) {
    let toast = document.getElementById(toastId);
    toast.classList.remove('ila-toast--open');
    toast.classList.add('ila-toast--closed');
}

function manageAutoclose(toastId) {
    setTimeout(() => closeToast(toastId), 8000);
}
