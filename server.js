

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var validUrl = require('valid-url');
var dotenv = require('dotenv');

dotenv.config();
var url = process.env.MONGOLAB_URI;

app.use('/public', express.static(process.cwd() + '/public'));

var APP_URL = 'https://receptive-mine.glitch.me/';  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

//receives basic url and responds with 'shortened' url in JSON
app.route('/new/:newUrl(*|/)')
    .get(function(req, res) {
    var response = {};
		  //Validate Input URL
    if (validUrl.isUri(req.params.newUrl)){
    //save url to db
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
    
      db.collection('urls').count( function (error, count){
        if (error) throw error;
        var myobj = { "_id": count+1,"original_url": req.params.newUrl };
        db.collection("urls").insertOne( myobj, function(err, result) {
          if (err) throw err;
          response = { "original_url":req.params.newUrl, "short_url":APP_URL + (count+1).toString() }
          db.close();
          res.json(response);
        });
      });
    });
    } else {
        response = req.params.newUrl.toString() + ' Not a URI';
        res.json(response);
    }
    
    });

//redirects to URL of previously shortened ID
app.route('/:urlId')
    .get(function(req, res) {
      //Connect to DB
        //check for ID
      //close DB connect
      //redirect or return error
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})



app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

