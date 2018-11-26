'use strict';
function str2ab(str) {
    var encoder = new TextEncoder('utf-8');
    return encoder.encode(str + "**EOF**").buffer;
} 

function ab2str(ab) {
    var dataView = new DataView(ab);
    var decoder = new TextDecoder('utf-8');
    return decoder.decode(dataView);
}
 
var arrayBuffer = str2ab("This is a string converted to a Uint8Array");
arrayBuffer = str2ab("ddddddddddddddddddd");
 
var socketId;

function sendMsg () 
{  
	chrome.sockets.tcp.onReceive.addListener(function (info){
		if (info.socketId == socketId)
		{
			chrome.notifications.create('',
			{
				type: 'basic',
				iconUrl: 'icon-128.png',
				title: 'Recieve',
				message: ab2str(info.data) 
			}, 
			function (notificationID) {
			}); 	
		}; 
		document.getElementById('response').innerHTML = "<p>" + ab2str(info.data) + "</p>"; 
	}); 
	 
    var msg = document.getElementById('input-text').value; 
	
	chrome.sockets.tcp.create({}, 
		function(createInfo) {
			socketId = createInfo.socketId;
			chrome.sockets.tcp.connect(socketId, '192.168.56.101', 50008, function(result){ //There isn’t any interesting result, just a zero to indicate that all is well. 
				chrome.sockets.tcp.send(socketId, str2ab(msg), function (sendInfo){
					console.log(sendInfo);					
				}) 
			});
		});		
};
 
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('tcp-send').addEventListener('click', sendMsg);  // https://developer.mozilla.org/en-US/docs/Web/Events
});