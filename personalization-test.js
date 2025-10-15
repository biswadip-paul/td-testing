// Minimal wrapper to define fireAdobeTags function required by script.js
window.fireAdobeTags = function(personalizationData) {
    if (typeof s === 'undefined') return;

    s.pageName = document.title;
    s.channel = 'Legal Solutions';

    if (personalizationData) {
        s.eVar1 = personalizationData.segment || '';
        s.eVar2 = personalizationData.recommendation || '';
        s.prop1 = personalizationData.user_type || '';
    }

    s.t();
};

// Wait max 10ms for SDKs to load, then run original script.js code
setTimeout(function() {
  // Original script.js code
  if (typeof td_instance !== 'undefined' && typeof s !== 'undefined') {

    console.log('%c→ Testing Mode: Simulating API call (CORS restricted)', 'color: #F59E0B; font-weight: bold;');

    // Make the personalization API call
    fetch('https://us01.p13n.in.treasuredata.com/public/src_js_sdk/tr_web_pageviews_rt2', {
      method: 'POST',
      headers: {
        "Content-Type": "application/vnd.treasuredata.v1+json",
        "WP13n-Token": "11521/1/f24d2c4009a74fc2ac1811a3a3414a9b", // safe to expose client-side
        'Authorization': 'TD1 11521/c34f125ac9eff40a45549a42a22b545fa6a434ad'
      },
      body: JSON.stringify({
        td_client_id: td_instance.client.track.values.td_client_id(),
        td_url: td_instance.client.track.values.td_url(),
        td_path: td_instance.client.track.values.td_path(),
        td_host: td_instance.client.track.values.td_host(),
        td_referrer: td_instance.client.track.values.td_referrer(),
        td_title: td_instance.client.track.values.td_title(),
        td_description: td_instance.client.track.values.td_description(),
        td_charset: td_instance.client.track.values.td_charset(),
        td_language: td_instance.client.track.values.td_language(),
        td_color: td_instance.client.track.values.td_color(),
        td_screen: td_instance.client.track.values.td_screen(),
        td_viewport: td_instance.client.track.values.td_viewport(),
        td_platform: td_instance.client.track.values.td_platform(),
        td_user_agent: td_instance.client.track.values.td_user_agent(),
        td_version: td_instance.client.track.values.td_version(),
        ecid: s.marketingCloudVisitorID,
        // Add any other context data needed for personalization
      })
    })
    .then(res => res.json())
    .then(data => {
      // Fire Adobe tags with the personalization context
      fireAdobeTags(data);
    })
    .catch(error => {
      console.error('Personalization failed:', error);
      // Fire default Adobe tags even if personalization fails
      fireAdobeTags(null);
    });
  } else {
    console.warn('TD SDK or Adobe Analytics not loaded. Skipping personalization call.');
    // Fire default Adobe tags without personalization
    fireAdobeTags(null);
  }
}, 150);
