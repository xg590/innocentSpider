var port = chrome.runtime.connect();
// 1. Fire after the DOM of website is loaded.
window.addEventListener("load", function(event) {
	setTimeout(function() {
		// 2. Send DOM to popup.js
		port.postMessage({url: window.document.URL, 
		                  dom: window.document.documentElement.outerHTML});
	}, 10000); // Delay 10 sec
});
port.onMessage.addListener(function(msg) {
	// 3. Fired when told be popup.js that DOM was received.
	if (msg.tell_content_script_js == "I_Gotcha_You") close()
});