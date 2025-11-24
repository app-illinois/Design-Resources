let cookie_url = 'DEPLOY_URL';  // This is replaced with the correct URL during GitHub Action runs.
// cookie_url = '.' // Uncomment when testing specific domain using local host entries.
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    cookie_url = '.'; // For local testing only
    console.warn('Cookie Banner is in development mode: '
        + 'Please set cookie_url in production.');
}

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
    document.body.classList.add('ila-cookieb-noscroll');

    // Used to enable a modal background on the page
    let modalIDvar = document.getElementById('ilaCookieModal');
    modalIDvar.classList.add('ila-cookieb-modal');

    // Start the focus on the X button so that reading can continue from there.
    let cookie_focus = document.getElementById('ilaCookieNoticeDiv');
    cookie_focus.setAttribute('tabindex', '-1'); // Focusable, but outside tab order
    if(cookie_focus){ cookie_focus.focus(); }

}

function closeCookieB(cookiebId) {
    let cookieb = document.getElementById(cookiebId);

    // Only move forward if the Cookie Banner is Open
    if (cookieb.classList.contains('ila-cookieb--open')) {

        cookieb.classList.remove('ila-cookieb--open');
        cookieb.classList.add('ila-cookieb--closed');

        // Remember that the notice has been dismissed
        setDismissCookieNotice();

        // Used to enable scroll on the page
        document.body.classList.remove('ila-cookieb-noscroll');

        // Used to disable a modal background on the page
        let modalIDvar = document.getElementById('ilaCookieModal');
        modalIDvar.classList.remove('ila-cookieb-modal');

        // Put focus back to the page body on close
        document.body.setAttribute('tabindex', '-1'); // Focusable but outside tab order
        document.body.focus();

    }
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

function getBaseDomain() {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  if (parts.length >= 2) {
    return '.' + parts.slice(-2).join('.'); // returns last two terms of url
  } else {
    return hostname; // fallback for localhost, etc.
  }
}

function getCookieString(expires) {
    return "cookie_notice=hide;Path=/;SameSite=Lax;domain=" + getBaseDomain() + ";expires=" + expires.toUTCString();
}

function getFallBackCookieString(expires) {
    return "cookie_notice=hide;Path=/;SameSite=Lax;expires=" + expires.toUTCString();
}


async function setDismissCookieNotice() {
    var expires = new Date();
    expires.setMonth(expires.getMonth() + 6);
    document.cookie = getCookieString(expires);
    if(!await getDismissCookieNotice())
    {
        // Site headers may reject our attempt to set a domain-wide cookie. (github.io does)
        // Recover by setting a cookie only for the current sub-domain.
        console.debug("Browser rejected domain-wide cookie. Setting local cookie to suppress dismissed notice.");
        document.cookie = getFallBackCookieString(expires);
    }
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
    // Use getFallBackCookieString because getCookieString does not work on
    // github.io domains.
    document.cookie = getFallBackCookieString(expires);
    location.reload();
}

async function addCookieBanner() {

    let about_button = document.getElementById("ot-sdk-btn");

    let data_fetch = this_script.getAttribute("data-cookie-fetch");
    if(data_fetch != "no"){

        /* Appends to the end of the page. */
        let theme = this_script.getAttribute("data-domain-script");

        switch(theme) {
            case "c2f2262d-b694-4eba-8f4b-142c102b685a":  // UIC
            case "uic":
                css_content = await getCookieBannerContent(cookie_url + '/css/ila-cookie-uic-colors.css');
                break;
            case "698d1fb7-b06b-4591-adbf-ac44ae3ef77b": // UIS
            case "uis":
                css_content = await getCookieBannerContent(cookie_url + '/css/ila-cookie-uis-colors.css');
                break;
            default:
                css_content = await getCookieBannerContent(cookie_url + '/css/ila-cookie-uiuc-colors.css');
                break;
        }

        // Add cookie banner to page
        let banner_content = "<style>";
        banner_content += await getCookieBannerContent(cookie_url + '/css/ila-slideover.css');
        banner_content += await getCookieBannerContent(cookie_url + '/css/ila-cookie-banner.css');
        banner_content += css_content;
        banner_content += "</style>";
        banner_content += await getCookieBannerContent(cookie_url + '/partials/ila-cookie-banner-content.part.html');
        if (!banner_content.includes("Cookie Notice")) {
            console.warn("Unexpected Cookie Notice:", banner_content);
            if (about_button) {
                about_button.addEventListener("click", function() {
                    alert("Cookie Notice is down for maintenance.");
                });
            }
            return;  /* Prevents showing any S3 error messages at the end of every
                        campus webpage. */
        }
        document.body.insertAdjacentHTML("beforeend", banner_content);

    }

    document.querySelectorAll("[data-cookie-action]").forEach(button => {
        switch (button.getAttribute("data-cookie-action")) {
            case "close-banner":
                button.addEventListener("click", function() {
                    closeCookieB('ilaCookieBOne');
                });
                break;
            case "open-about":
                button.addEventListener("click", function() {
                    openSlideover('ilaCookieSlideover', 'ilaCookieAboutButton');
                });
                break;
            case "close-about":
                button.addEventListener("click", function() {
                    closeSlideover('ilaCookieSlideover');
                });
                break;
            case "unhide-banner":
                button.addEventListener("click", function() {
                    unsetCookieNoticeCookie();
                });
                break;
        }
    });

    // Show cookie banner
    openCookieB('ilaCookieBOne');

    // Open the 'About Cookies' slide-over when existing legacy 'About Cookies' buttons are clicked.
    if (about_button) {
        about_button.addEventListener("click", function() {
            openSlideover('ilaCookieSlideover', about_button);
        });
    }

    // Dismiss the Cookie banner when `Escape` is pressed
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeCookieB('ilaCookieBOne');
        }
    });
    createCookieNoticeFocusCycle();

}

window.addEventListener("load", function(event){
    addCookieBanner();
});

function createCookieNoticeFocusCycle() {
    first = document.getElementById("ilaCookieBXButton");
    first.addEventListener('keydown', function(e){
        if (e.keyCode===9 && e.shiftKey) {
            last.focus();
            e.preventDefault();
        }});

    last = document.getElementById("ilaCookieCloseButton");
    last.addEventListener('keydown', function(e){
        if (e.keyCode===9 && !e.shiftKey) {
            first.focus();
            e.preventDefault();
        }});
}
