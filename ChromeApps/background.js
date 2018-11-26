'use strict'; 
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('sender.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});