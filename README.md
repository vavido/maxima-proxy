# maxima-proxy

A small attempt at writing a http-to-socket proxy for [Maxima](https://maxima.sourceforge.io/de/index.html)

## Getting started

1. Install [Node.js](https://nodejs.org/en/) and npm
2. run `npm install` inside the root folder of the project (might take a few seconds)
3. run `npm run serve` to start the server locally. It should automatically restart when the code changes. To test if the server is running, go to http://localhost:3000/status
4. start maxima with the option `-s 3001` 
5. Use the proxy on localhost by `POST`ing your request to maxima, for example using curl
```
curl --location --request POST 'localhost:3000/' \
--header 'Content-Type: text/plain' \
--data-raw 'x = 1 + 2;'
```
