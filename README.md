# innocentSpider
Webspider against anti-bot solution <br>
Python is hard to handle javascript. Selenium is detectable by javascript. Maybe self-made google apps can beat some anti-bot solution. <br>
Idea: Communicate with python for input. Visit webpage, process the DOM and send result back to python. <br>
<p>
Usage: <br>
  Use flask_apps.ipynb to run a python-based web app server, where one endpoint provides the extension urls to scrape and the another receive DOM from it.<br>
  Open chrome://extensions/ and turn on the develop mode. Load the unpacked innocentSpider/ChromeExtension/ directory. Then a pop-up button can begin the scraping. 
  
<p><p><br>
Directory innocentSpider/ChromeApps is useless at this time.
