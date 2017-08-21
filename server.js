

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://<dbuser>:<dbpassword>@ds153113.mlab.com:53113/fcc_urldb';  
var validUrl = require('valid-url');

app.use('/public', express.static(process.cwd() + '/public'));


  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

//receives basic url and responds with 'shortened' url in JSON
app.route('/new/:newUrl(*|/)')
    .get(function(req, res) {
    var response = '';
		  //Validate Input URL
    if (validUrl.isUri(req.params.newUrl)){
        response = req.params.newUrl + ' Looks like an URI';
    } else {
        response = req.params.newUrl.toString() + ' Not a URI';
    }
      //Connect to DB
        //add url and get ID
        //save ID
        //close DB connect
      //generate JSON 
        //Example: { "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }
      //respond JSON
    res.json(response);
    })

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

