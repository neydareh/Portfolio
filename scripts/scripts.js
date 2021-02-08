var analyticsId;

/** 

// If analytics id has been manually defined
if (analyticsId) {
    // Initialize GA with local var
    initGoogleAnalytics(analyticsId);
} else {
    // Initialize GA with Netlify env var available via lamba function
    fetch("/.netlify/functions/env_vars")
        .then(getEnvVar)
        .then(initGoogleAnalytics)
        .catch(handleError);
}
**/

// -------------------------------------------------
// Helper Functions
// --------------------------------------------------

function handleError(error) {
    console.log("error", error);
}

function getEnvVar(response) {
    // If the request was successful
    if (response.ok) {
        // Return the response text
        return response.text();
    } else {
        // Return a rejected Promise object, triggering the .catch()
        return Promise.reject(response);
    }
}

// Set Up Google Analytics
function initGoogleAnalytics(analyticsId) {
    if (analyticsId) {
        // Inject the Google Analytics Tag Manager script into the DOM
        analyticsUrl =
            "https://www.googletagmanager.com/gtag/js?id=UA-" + analyticsId;
        var ref = document.getElementsByTagName("script")[0];
        var script = document.createElement("script");
        script.src = analyticsUrl;
        ref.parentNode.insertBefore(script, ref);

        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "UA-" + analyticsId);
    }
}