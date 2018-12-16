var port = chrome.runtime.connect();
port.onMessage.addListener(function(msg) {
	if (msg.from_popup == "I_Gotcha_You")
		close();
});

window.addEventListener("load", function(event) { 
	port.postMessage({documentElement_html: window.document.documentElement.outerHTML, document_url: window.document.URL});
});