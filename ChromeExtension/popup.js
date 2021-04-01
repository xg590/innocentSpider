function send_message_to_python(url, doc) { // 1. Declare a function for later use. It POSTs DOM to the backend python.
	var database_url = 'http://127.0.0.1:9999/database';
	var oReq = new XMLHttpRequest();
	oReq.open('POST', database_url, true);
	oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	oReq.send("url=" + encodeURI(url) + "&doc=" + encodeURIComponent(doc));
}

chrome.runtime.onConnect.addListener(function(port) { // 2. A listener fired when message comes from content_script.js via message passing "https://developer.chrome.com/extensions/messaging"
	port.onMessage.addListener(function(msg) { // 9. Response from each content_script.js is stored in msg
		port.postMessage({"tell_content_script_js": "I_Gotcha_You"}); // 10. Tell the newly opened webpage that it's over (it will close when I_Gotcha_You is replied)
		send_message_to_python(msg.url, msg.dom); // 11. POST data to the database
	});
}); 

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('begin').onclick = function () { // 3. Click element begin in popup.html to initiate the web scrawling
		var objReq = new XMLHttpRequest();
		objReq.addEventListener("load", function () { // 5. Fired when GET (urls) request is done
			var resp = JSON.parse(objReq.responseText);
			for (var i = 0; i < resp.url.length; ++i) { // 6. Loop over urls
				var createProperties = {url: resp.url[i], active: false};
				chrome.tabs.create(createProperties, function (tab) { // 7. Open new webpage for each url, which fires the content_script.js
					chrome.tabs.executeScript(tab.id, {file: "content_script.js"}); // 8. Content script will process each newly opened webpage. Response from content script will fire chrome.runtime.onConnect.addListener();
				});
			}
		});
		objReq.open("GET", "http://127.0.0.1:9999/get_url", true);  // 4. Get which urls to scrawl
		objReq.send();

    }
}); //setTimeout(function(){ ; }, Math.random() * 3000);

