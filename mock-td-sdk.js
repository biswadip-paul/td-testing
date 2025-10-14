// Treasure Data JS SDK Loader
(function() {
    'use strict';

    // Load Treasure Data SDK from CDN
    !function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=["addRecord","blockEvents","fetchServerCookie","fetchGlobalID","fetchUserSegments","resetUUID","ready","setSignedMode","setAnonymousMode","set","trackEvent","trackPageview","trackClicks","unblockEvents"],s=0;s<r.length;s++){var c=r[s];e[t].prototype[c]=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}}(c)}var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/4.1/td.min.js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o)}}("Treasure",window);


    // Wait for SDK to load then initialize
    const checkTDLoaded = setInterval(function() {
        if (window.Treasure && typeof window.Treasure === 'function') {
            clearInterval(checkTDLoaded);
            initializeTD();
        }
    }, 100);

    function initializeTD() {
        try {
            // Initialize Treasure Data instance
            window.td_instance = new Treasure({
                database: 'your_database',
                writeKey: 'your_write_only_key'
            });

            console.log('%c✓ Treasure Data SDK Loaded Successfully', 'color: #10B981; font-weight: bold;', {
                database: 'your_database',
                version: '2.5'
            });

            // Dispatch custom event for debug panel
            window.dispatchEvent(new CustomEvent('td-sdk-loaded', {
                detail: {
                    database: 'your_database',
                    timestamp: new Date().toISOString(),
                    ready: true
                }
            }));

        } catch (error) {
            console.error('%c✗ Treasure Data SDK Error:', 'color: #EF4444; font-weight: bold;', error);

            window.dispatchEvent(new CustomEvent('td-sdk-error', {
                detail: {
                    error: error.message,
                    timestamp: new Date().toISOString()
                }
            }));
        }
    }

})();
