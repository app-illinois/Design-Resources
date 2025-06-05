
// TODO: Update this to a load-balanced resilient (CDN) path:
let cookie_banner_root_url = 'https://app-illinois.github.io/Design-Resources';
// For local testing purposes, uncomment the line below and comment out the line above:
// let cookie_banner_root_url = '.';
let get_url = cookie_banner_root_url;

var this_script = document.currentScript; // Must run before any function calls

async function openCookieB(cookiebId) {
    // Do not show if our 'dismiss' cookie is set
    let skip = await getDismissCookieNotice();
    if(skip) { return; }

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

    let cookie_focus = document.getElementById('ilaCookieCloseButton');
    if(cookie_focus){ cookie_focus.focus(); }

}

function closeCookieB(cookiebId) {
    let cookieb = document.getElementById(cookiebId);
    cookieb.classList.remove('ila-cookieb--open');
    cookieb.classList.add('ila-cookieb--closed');

    // Used to enable scroll on the page
    // document.body.classList.remove('ila-cookieb-noscroll');
    //

    setDismissCookieNotice();

    // Used to disable a modal background on the page
    // let modalIDvar = document.getElementById(modalID);
    // modalIDvar.classList.remove('ila-cookieb-modal');

    // Put focus at the start of the page.
    let h1tag = document.querySelector('h1');
    if(h1tag) { h1tag.focus(); }
}

function manageAutoclose(cookiebId) {
    /* setTimeout(() => closeCookieB(cookiebId), 8000); */
}

async function getCookieBannerContent(content_path) {
    /* Tip: It may be necssary to expand content_path to
    include the full final web URL of the partial file. */
    let banner_response = await fetch(content_path);
    let banner_content = await banner_response.text();
    return banner_content;
}

async function setDismissCookieNotice() {
    var expires = new Date();
    expires.setMonth(expires.getMonth() + 6);
    document.cookie = "cookie_notice=hide;expires=" + expires.toUTCString();
}

async function getDismissCookieNotice() {
    let result = ('; '+document.cookie).split(`; cookie_notice=`).pop().split(';')[0];
    if(result == "") {
        return false;
    }
    return true;
}


function unsetCookieNoticeCookie() {
    // Helper for Demo Pages - Call this to make the Notice appear again.
    var expires = new Date();
    expires.setMonth(expires.getMonth() - 1);
    document.cookie = "cookie_notice=hide;expires=" + expires.toUTCString();
    location.reload();
}


async function addCookieBanner() {
    /* Appends to the end of the page. */
    let theme = this_script.getAttribute("data-domain-script");

    switch(theme) {
        case "c2f2262d-b694-4eba-8f4b-142c102b685a":  // UIC
        case "uic":
            css_content = await getCookieBannerContent(get_url + '/css/ila-cookie-uic-colors.css');
            break;
        case "698d1fb7-b06b-4591-adbf-ac44ae3ef77b": // UIS
        case "uis":
            css_content = await getCookieBannerContent(get_url + '/css/ila-cookie-uis-colors.css');
            break;
        default:
            css_content = await getCookieBannerContent(get_url + '/css/ila-cookie-uiuc-colors.css');
            break;
    }


    // Add cookie banner to page
    let about_button = document.getElementById("ot-sdk-btn");
    let banner_content = "<style>";
    banner_content += await getCookieBannerContent(get_url + '/css/ila-slideover.css');
    banner_content += await getCookieBannerContent(get_url + '/css/ila-cookie-banner.css');
    banner_content += css_content;
    banner_content += "</style>";
    banner_content += await getCookieBannerContent(get_url + '/partials/ila-cookie-banner-content.part.html');
    if (!banner_content.includes("Cookie Notice")) {
        console.warn("Unexpected Cookie Notice:", banner_content);
        if (about_button) {
            about_button.addEventListener("click", function() {
                alert("Cookie Notice is down for maintenance.");
            });
        }
        return;  /* Prevents appending error message to live webpage. */
    }
    document.body.insertAdjacentHTML("beforeend", banner_content);

    // Show cookie banner
    openCookieB('ilaCookieBOne');

    // Open the 'About Cookies' slide-over when existing legacy 'About Cookies' buttons are clicked.
    if (about_button) {
        about_button.addEventListener("click", function() {
            openSlideover('ilaCookieSlideover', about_button);
        });
    }
}

window.onload = function(){
    addCookieBanner();
};
