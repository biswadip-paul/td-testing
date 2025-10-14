// Debug UI Controller
(function() {
    'use strict';

    // DOM Elements
    const debugToggle = document.getElementById('debug-toggle');
    const debugPanel = document.getElementById('debug-panel');
    const debugClose = document.getElementById('debug-close');
    const clearLogsBtn = document.getElementById('clear-logs');
    const triggerTestBtn = document.getElementById('trigger-test');

    // Status elements
    const tdStatus = document.getElementById('td-status');
    const adobeStatus = document.getElementById('adobe-status');

    // Data display elements
    const requestPayload = document.getElementById('request-payload');
    const responseStatus = document.getElementById('response-status');
    const responseTime = document.getElementById('response-time');
    const responseData = document.getElementById('response-data');
    const adobeTags = document.getElementById('adobe-tags');
    const consoleLogs = document.getElementById('console-logs');

    // Console log storage
    let logEntries = [];

    // Toggle debug panel
    debugToggle.addEventListener('click', function() {
        debugPanel.classList.add('active');
        debugToggle.style.display = 'none';
    });

    debugClose.addEventListener('click', function() {
        debugPanel.classList.remove('active');
        debugToggle.style.display = 'block';
    });

    // Clear logs
    clearLogsBtn.addEventListener('click', function() {
        logEntries = [];
        updateConsole();
    });

    // Trigger test
    triggerTestBtn.addEventListener('click', function() {
        if (typeof window.triggerPersonalizationTest === 'function') {
            window.triggerPersonalizationTest();
        } else {
            addLog('error', 'Personalization test function not available');
        }
    });

    // Add log entry
    function addLog(type, message, data) {
        const timestamp = new Date().toLocaleTimeString();
        logEntries.push({
            type: type,
            message: message,
            data: data,
            timestamp: timestamp
        });

        // Keep only last 50 logs
        if (logEntries.length > 50) {
            logEntries.shift();
        }

        updateConsole();
    }

    // Update console display
    function updateConsole() {
        if (logEntries.length === 0) {
            consoleLogs.innerHTML = '<div class="log-entry">No logs yet</div>';
            return;
        }

        consoleLogs.innerHTML = logEntries.map(log => {
            const dataStr = log.data ? ' ' + JSON.stringify(log.data) : '';
            return `<div class="log-entry ${log.type}">[${log.timestamp}] ${log.message}${dataStr}</div>`;
        }).join('');

        // Scroll to bottom
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }

    // Listen for TD SDK loaded
    window.addEventListener('td-sdk-loaded', function(e) {
        tdStatus.textContent = 'Loaded';
        tdStatus.className = 'status-value loaded';
        addLog('success', 'TD SDK Loaded', e.detail);
    });

    // Listen for TD SDK errors
    window.addEventListener('td-sdk-error', function(e) {
        tdStatus.textContent = 'Error';
        tdStatus.className = 'status-value not-loaded';
        addLog('error', 'TD SDK Error', e.detail);
    });

    // Listen for Adobe Analytics loaded
    window.addEventListener('adobe-analytics-loaded', function(e) {
        adobeStatus.textContent = 'Loaded';
        adobeStatus.className = 'status-value loaded';
        addLog('success', 'Adobe Analytics Loaded', e.detail);
    });

    // Listen for personalization request
    window.addEventListener('personalization-request', function(e) {
        requestPayload.textContent = JSON.stringify(e.detail.payload, null, 2);
        addLog('info', 'Personalization Request Sent');
    });

    // Listen for personalization response
    window.addEventListener('personalization-response', function(e) {
        responseStatus.textContent = e.detail.status;
        responseStatus.style.color = e.detail.status === 200 ? '#10B981' : '#EF4444';
        responseTime.textContent = e.detail.time;
        responseData.textContent = JSON.stringify(e.detail.data, null, 2);
        addLog('success', 'Personalization Response Received', {
            status: e.detail.status,
            time: e.detail.time
        });
    });

    // Listen for personalization error
    window.addEventListener('personalization-error', function(e) {
        responseStatus.textContent = 'Error';
        responseStatus.style.color = '#EF4444';
        responseTime.textContent = e.detail.time || '-';
        responseData.textContent = JSON.stringify({ error: e.detail.error }, null, 2);
        addLog('error', 'Personalization Error', e.detail);
    });

    // Listen for Adobe tags fired
    window.addEventListener('personalization-adobe-fired', function(e) {
        adobeTags.textContent = JSON.stringify(e.detail.tags, null, 2);
        addLog('info', 'Adobe Tags Fired', e.detail);
    });

    // Listen for Adobe tracking events
    window.addEventListener('adobe-track', function(e) {
        addLog('info', `Adobe ${e.detail.type} tracked`, e.detail.data);
    });

    // Override console methods to capture logs
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = function() {
        originalLog.apply(console, arguments);
        if (arguments.length > 0 && typeof arguments[0] === 'string') {
            // Skip styled console logs (they start with %c)
            if (!arguments[0].startsWith('%c')) {
                addLog('info', Array.from(arguments).join(' '));
            }
        }
    };

    console.error = function() {
        originalError.apply(console, arguments);
        if (arguments.length > 0) {
            const message = Array.from(arguments).map(arg => {
                if (typeof arg === 'object') return JSON.stringify(arg);
                return String(arg);
            }).join(' ');

            if (!message.startsWith('%c')) {
                addLog('error', message);
            }
        }
    };

    console.warn = function() {
        originalWarn.apply(console, arguments);
        if (arguments.length > 0 && typeof arguments[0] === 'string') {
            if (!arguments[0].startsWith('%c')) {
                addLog('warning', Array.from(arguments).join(' '));
            }
        }
    };

    // Initialize
    addLog('info', 'Debug panel initialized');

    // Check initial SDK status
    setTimeout(function() {
        if (typeof td_instance === 'undefined') {
            tdStatus.textContent = 'Not Loaded';
            tdStatus.className = 'status-value not-loaded';
        }
        if (typeof s === 'undefined') {
            adobeStatus.textContent = 'Not Loaded';
            adobeStatus.className = 'status-value not-loaded';
        }
    }, 1000);

})();