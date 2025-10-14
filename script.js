// Check if both TD SDK and Adobe Analytics are loaded
if (typeof td_instance !== 'undefined' && typeof s !== 'undefined') {
  // Make the personalization API call
  fetch('https://us01.p13n.in.treasuredata.com/public/src_js_sdk/tr_web_pageviews_rt2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.treasuredata.v1+json',
      'WP13n-Token': '11521/1/5156c1fdefe24737b23ee39824523625'
    },
    body: JSON.stringify({
      td_client_id: td_instance.client.track.td_client_id(),
      td_url: td_instance.client.track.td_url(),
      td_path: td_instance.client.track.td_path(),
      td_host: td_instance.client.track.td_host(),
      td_referrer: td_instance.client.track.td_referrer(),
      td_title: td_instance.client.track.td_title(),
      td_description: td_instance.client.track.td_description(),
      td_charset: td_instance.client.track.td_charset(),
      td_language: td_instance.client.track.td_language(),
      td_color: td_instance.client.track.td_color(),
      td_screen: td_instance.client.track.td_screen(),
      td_viewport: td_instance.client.track.td_viewport(),
      td_platform: td_instance.client.track.td_platform(),
      td_user_agent: td_instance.client.track.td_user_agent(),
      td_version: td_instance.client.track.td_version(),
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