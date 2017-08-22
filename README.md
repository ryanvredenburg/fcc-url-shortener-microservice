FreeCodeCamp API Basejump: URL Shortener Microservice

Project to complete FCC project: https://www.freecodecamp.org/challenges/url-shortener-microservice

Live Demo At: https://receptive-mine.glitch.me/

User stories:

I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
When I visit that shortened URL, it will redirect me to my original link.
Example creation usage:
https://receptive-mine.glitch.me/new/https://www.google.com
https://receptive-mine.glitch.me/new/http://foo.com:80
Example creation output
{ "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }
Usage:
https://receptive-mine.glitch.me/2
Will redirect to:
https://www.google.com/
