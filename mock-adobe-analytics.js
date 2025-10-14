// Mock Adobe Analytics SDK
(function() {
    'use strict';

    // Generate a mock Marketing Cloud Visitor ID (ECID)
    function generateECID() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 15);
        return `${timestamp}${random}`.substring(0, 33).toUpperCase();
    }

    // Mock Adobe Analytics s object
    window.s = {
        // Visitor ID
        marketingCloudVisitorID: generateECID(),

        // Standard properties
        pageName: document.title,
        channel: 'Legal Solutions',

        // E-commerce variables
        products: '',
        events: '',

        // Custom variables
        prop1: '',
        prop2: '',
        eVar1: '',
        eVar2: '',

        // Campaign tracking
        campaign: '',

        // Methods
        t: function() {
            console.log('%c→ Adobe Analytics: Page View Tracked', 'color: #FF6200; font-weight: bold;', {
                pageName: this.pageName,
                ecid: this.marketingCloudVisitorID,
                timestamp: new Date().toISOString()
            });

            // Dispatch event for debug panel
            window.dispatchEvent(new CustomEvent('adobe-track', {
                detail: {
                    type: 'pageview',
                    data: {
                        pageName: this.pageName,
                        ecid: this.marketingCloudVisitorID
                    }
                }
            }));
        },

        tl: function(linkObject, linkType, linkName, variableOverrides) {
            console.log('%c→ Adobe Analytics: Link Tracked', 'color: #FF6200; font-weight: bold;', {
                linkType: linkType,
                linkName: linkName,
                ecid: this.marketingCloudVisitorID,
                timestamp: new Date().toISOString()
            });

            // Dispatch event for debug panel
            window.dispatchEvent(new CustomEvent('adobe-track', {
                detail: {
                    type: 'link',
                    data: {
                        linkType: linkType,
                        linkName: linkName,
                        ecid: this.marketingCloudVisitorID
                    }
                }
            }));
        },

        // Clear variables after tracking
        clearVars: function() {
            this.events = '';
            this.products = '';
            this.prop1 = '';
            this.prop2 = '';
            this.eVar1 = '';
            this.eVar2 = '';
        }
    };

    // Log that Adobe Analytics is loaded
    console.log('%c✓ Adobe Analytics Mock Loaded', 'color: #FF6200; font-weight: bold;', {
        ecid: window.s.marketingCloudVisitorID,
        version: 'AppMeasurement-2.x-mock'
    });

    // Dispatch custom event for debug panel
    window.dispatchEvent(new CustomEvent('adobe-analytics-loaded', {
        detail: {
            ecid: window.s.marketingCloudVisitorID,
            timestamp: new Date().toISOString()
        }
    }));
})();