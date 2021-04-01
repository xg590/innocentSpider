# innocentSpider
An experimental webspider against the anti-bot solution <br>
Some website might require the execution of an anti-bot javascript to proceed, which blocks the traditional Python-based webspider since it is hard to handle the anti-bot javascript. Selenium is also detectable by the anti-bot javascript. Maybe a self-made google extension can beat some anti-bot solutions. <br>
Idea: A web browser extension can
1. Get urls to scrape from a Python-based web app server. 
2. Open urls and extract DOMs. 
3. Send DOMs back to app server. 
4. Beatifulsoup works on the DOM and sqlite documents the outcomes.
<p>
Usage: <br>
Use flask_app.ipynb to run a python-based web app server, where one endpoint provides the extension urls to scrape and the another receives the DOM from it.<br>
  Open chrome://extensions/ and turn on the develop mode. Load the unpacked innocentSpider/ChromeExtension/ directory. Then a pop-up button can begin the scraping. 
  
<p><p><br>
Directory innocentSpider/ChromeApps is useless at this time.
