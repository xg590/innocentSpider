var port = chrome.runtime.connect();
port.onMessage.addListener(function(msg) { 
	if (msg.tell_content_script_js == "I_Gotcha_You") // 3. Fired when told be popup.js that DOM was received.
	    close()
}); 

window.addEventListener("load", function(event) { // 1. Fire after the DOM of website is loaded. 
	setTimeout(function() {
		port.postMessage({url: window.document.URL, dom: window.document.documentElement.outerHTML}); // 2. Send DOM to popup.js
	}, 10000);
	
});