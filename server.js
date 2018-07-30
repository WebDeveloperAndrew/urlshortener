var express = require('express');
var mongo = require('mongodb');
var urlapi = require('./app/urlShortener.js');
var dburl = process.env.MONGO_URI;

var app = express();

//connect to database
mongo.MongoClient.connect(dburl, function(err, db) {

  if (err) {
    throw new Error('Error: Database not connected');
  } else {
    console.log('Connected to MongoDB');
  }

  //create collection
  db.createCollection("sites", {
    capped: true,
    size: 500000,
    max: 500
  });
  
  urlapi(app, db);
  
  var port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
  });
  
});
