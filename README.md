# innocentSpider
Webspider against anti-bot solution <br>
Python is hard to handle the anti-bot javascript, which will block the request if itself cannot run correctly. Selenium is detectable by the anti-bot javascript. Maybe self-made google apps can beat some anti-bot solutions. <br>
Idea: An extension communicates with a Python-based web app server for the url input. It direct the page creation and extraction. Then it sends the DOM back to Python. <br>
<p>
Usage: <br>
  Use flask_apps.ipynb to run a python-based web app server, where one endpoint provides the extension urls to scrape and the another receive DOM from it.<br>
  Open chrome://extensions/ and turn on the develop mode. Load the unpacked innocentSpider/ChromeExtension/ directory. Then a pop-up button can begin the scraping. 
  
<p><p><br>
Directory innocentSpider/ChromeApps is useless at this time.
