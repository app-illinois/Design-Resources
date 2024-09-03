function openToast(toastId) {
    let toast = document.getElementById(toastId);
    toast.classList.remove('ila-toast--closed');
    toast.classList.add('ila-toast--open');
}

function closeToast(toastId) {
    let toast = document.getElementById(toastId);
    toast.classList.remove('ila-toast--open');
    toast.classList.add('ila-toast--closed');
}
