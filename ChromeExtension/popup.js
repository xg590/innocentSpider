var IP, PORT, URLs;
var TABCOUNT=0;
document.addEventListener("DOMContentLoaded", function () {
	// 1. Click "scrape" in popup.html to initiate the web scraping
    document.getElementById('scrape').onclick = function () {
		document.getElementById('scrape').innerHTML = "Me being closed<br/>Scraping fails";
		var objReq = new XMLHttpRequest();
		// 2. Fired when POST (urls) request is done
		objReq.addEventListener("load", function () {
			var resp = JSON.parse(objReq.responseText);
			// 3. Loop over urls
			let delay = document.getElementById('delay').value * 1000;
			for (var i = 0; i < resp.url.length; ++i) {
				TABCOUNT++;
				let createProperties = {url: resp.url[i], active: false}; 
				// 4. Open new webpage for each url, in which content_script.js runs
				setTimeout(function() {
					chrome.tabs.create(createProperties, function (tab) {
						// 5. content_script.js will process each newly opened webpage.
						//    and send back DOM of each webpage
						//    It will fire chrome.runtime.onConnect.addListener();
						//    see https://developer.chrome.com/docs/extensions/mv3/messaging/#connect
						chrome.scripting.executeScript({
							target: {tabId: tab.id}, files: ["content_script.js"]
						});
					});
				}, i * delay);
			}
		});
		// 6. POST request
		IP   = document.getElementById('ip'  ).value;
		PORT = document.getElementById('port').value;
		URLs = document.getElementById('urls').value;
		objReq.open("POST", ''.concat('http://', IP, ':', PORT, '/urlProvider'), true);
		objReq.send(URLs);
    }
});
// 7. This listener will be fired when message comes from content_script.js
chrome.runtime.onConnect.addListener(function(port) {
	// 9. Response from each content_script.js is stored in msg
	port.onMessage.addListener(function(msg) {
		// 10. Tell the newly opened webpage that it's over so it will close
		port.postMessage({"tell_content_script_js": "I_Gotcha_You"});
		// 11. POST data to the python
		send_message_to_python(msg.url, msg.dom);
	});
});
// 1. This function POSTs DOM to the backend python.
function send_message_to_python(url, doc) {
	TABCOUNT--;
	var oReq = new XMLHttpRequest();
	oReq.open('POST', ''.concat('http://', IP, ':', PORT, '/webpageStore'), true);
	oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	if (!TABCOUNT) {
		// If you close the popup.html too early, popup.js will stop before content_script.js and port (message passing) will fail.
		// TABCOUNT == 0, OK to close
		oReq.addEventListener("load", function () {
			document.getElementById('scrape').innerHTML = "Begin<br/>Scraping";
			var oReqCommit = new XMLHttpRequest();
			oReqCommit.open('GET', ''.concat('http://', IP, ':', PORT, '/commit'), true);
			oReqCommit.send();
		});
	}
	oReq.send("url=" + encodeURI(url) + "&doc=" + encodeURIComponent(doc));
}

