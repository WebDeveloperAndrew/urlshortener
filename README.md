# Url Shortener

This is a node.js microservice that shortens urls, it requires a mongo database.

## Primary Feature

This app will accept a url request sent on the route /new and create a shortened url and return it as json.

## Running Version

A version of this app is currently deployed to heroku

You can test this here: https://urlmicro.herokuapp.com/

Example Test: https://urlmicro.herokuapp.com/new/https://google.com

### Installing

Download the repo then from the directory

```sh
$ npm install 
```

Default run command

```sh
$ npm run start
```

### Todos

 - None at this time

### Tech

Url Shortener uses these packages and technologies to work for you:

* [npm] - A package manager for JavaScript
* [node.js] - A JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express] - A minimal and flexible Node.js web application framework
* [mongodb] - A free and open-source cross-platform document-oriented database program

License
----

ISC

[//]: #
   [npm]: <https://www.npmjs.com/>
   [node.js]: <https://nodejs.org>
   [express]: <https://expressjs.com>
   [mongodb]: <https://www.mongodb.com/>

