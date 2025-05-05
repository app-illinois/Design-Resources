async function openCookieB(cookiebId, focusOnLoad) {
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

async function getCookieBannerContent() {
    var content_path = 'partials/ila-cookie-banner-content.part.html';
    let banner_response = await fetch(content_path);
    let banner_content = await banner_response.text();
    return banner_content
}

async function addCookieBanner() {
    /* Appends to the end of the page. */
    
    // Add cookie banner to page
    let banner_content = await getCookieBannerContent();
    document.body.insertAdjacentHTML("afterend", banner_content);
    
    // Show cookie banner
    openCookieB('ilaCookieBOne', 'ilaCookieBFocusOnLoad');
}

// async function OptanonWrapper() {
//     /* Replace old OneTrust banner. */
//     await addCookieBanner();
// }

async function addCookieBannerToDiv() {
    /* Allows controlling placement of banner in page content. 
     * Requires <div id='ila-cookie-banner-here' /> to be added to page HTML.
    */
    let cookieb = document.getElementById('ila-cookie-banner-here');
    var content_path = 'partials/ila-cookie-banner-content.part.html';
    let banner_response = await fetch(content_path);
    let banner_content = await getCookieBannerContent();
    cookieb.insertAdjacentHTML("afterbegin", banner_content);
}

window.onload = function(){
    addCookieBanner();
};