function openCookieB(cookiebId, focusOnLoad) {
    let cookieb = document.getElementById(cookiebId);
    cookieb.classList.remove('ila-cookieb--closed');
    cookieb.classList.add('ila-cookieb--open');

    // remove property from older elements so newest element appears on bottom
    const olderElements = document.querySelectorAll('.ila-cookieb--first');
    olderElements.forEach((element) => {
        element.classList.remove('ila-cookieb--first');
    });
    cookieb.classList.add('ila-cookieb--first');
    manageAutoclose(cookiebId);

    // Used to disable scroll on the page 
    // document.body.classList.add('ila-cookieb-noscroll');

    // Used to enable a modal background on the page
    // let modalIDvar = document.getElementById(modalID);
    // modalIDvar.classList.add('ila-cookieb-modal');

    document.getElementById(focusOnLoad).focus();
}

function closeCookieB(cookiebId) {
    let cookieb = document.getElementById(cookiebId);
    cookieb.classList.remove('ila-cookieb--open');
    cookieb.classList.add('ila-cookieb--closed');

    // Used to enable scroll on the page 
    // document.body.classList.remove('ila-cookieb-noscroll');

    // Used to disable a modal background on the page
    // let modalIDvar = document.getElementById(modalID);
    // modalIDvar.classList.remove('ila-cookieb-modal');
}

function manageAutoclose(cookiebId) {
    /* setTimeout(() => closeCookieB(cookiebId), 8000); */
}
