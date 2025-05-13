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

async function getCookieBannerContent(content_path) {
    /* Tip: It may be necssary to expand content_path to 
    include the full final web URL of the partial file. */
    let banner_response = await fetch(content_path);
    let banner_content = await banner_response.text();
    return banner_content;
}

async function addCookieBanner() {
    /* Appends to the end of the page. */
    let script_element = document.getElementById("cookie-banner-script");
    let theme = 0;
    if(script_element){
        theme = script_element.getAttribute("data-domain-script");
    }
    else {
        // Legacy configurations may only have the <script data-domain-script=...>, with no id set.
        script_element = document.querySelector('script[data-domain-script]');
        if(script_element){
            theme = script_element.getAttribute("data-domain-script");
        }
    }
    
    if(theme) {
        switch(theme) {
            case "c2f2262d-b694-4eba-8f4b-142c102b685a":  // UIC
            case "uic":
                css_content = await getCookieBannerContent('css/ila-cookie-uic-colors.css');
                break;
            case "698d1fb7-b06b-4591-adbf-ac44ae3ef77b": // UIS
            case "uis":
                css_content = await getCookieBannerContent('css/ila-cookie-uis-colors.css');
                break;
            default:
                css_content = await getCookieBannerContent('css/ila-cookie-uiuc-colors.css');
                break;
        }
    }
    else {
        // If all else fails, use our default CSS
        console.debug("No cookie banner theme found, using default.")
        css_content = await getCookieBannerContent('css/ila-cookie-uiuc-colors.css');

    }
    
    
    // Add cookie banner to page
    let banner_content = "<style>";
    banner_content += await getCookieBannerContent('css/ila-slideover.css');
    banner_content += await getCookieBannerContent('css/ila-cookie-banner.css');
    banner_content += css_content;
    banner_content += "</style>";
    banner_content += await getCookieBannerContent('partials/ila-cookie-banner-content.part.html');
    document.body.insertAdjacentHTML("beforeend", banner_content);
    
    // Show cookie banner
    openCookieB('ilaCookieBOne', 'ilaCookieBFocusOnLoad');
}

window.onload = function(){
    addCookieBanner();
};
