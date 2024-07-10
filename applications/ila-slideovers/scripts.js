function openSlideover(id) {
    let slideover = document.getElementById(id);
    slideover.classList.remove('ila-slideover--closed');
    slideover.classList.add('ila-slideover--open');
}

function closeSlideover(id) {
    let slideover = document.getElementById(id);
    slideover.classList.remove('ila-slideover--open');
    slideover.classList.add('ila-slideover--closed');
}
