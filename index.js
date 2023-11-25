// 1. Always Use Asynchronous Functions

var fs = require('fs');
// Performing a blocking I/O
var file = fs.readFileSync('/etc/passwd');
console.log(file);
// Performing a non-blocking I/O
fs.readFile('/etc/passwd', function(err, file) {
    if (err) return err;
    console.log(file);
});


// 2. Avoid Sessions and Cookies in APIs, and Send Only Data in the API Response.

// 3. Optimize Database Queries

// Indexing is an approach to optimize the performance of a database by minimizing the number of disk accesses required when a query is 
// processed. It is a data structure technique that is used to quickly locate and access the data in a database. 

// Query without indexing:

db.user.find({email: 'ofan@skyshi.com'}).explain("executionStats")

//Query with indexing:

db.getCollection("user").createIndex({ "email": 1 }, { "name": "email_1", "unique": true })
{
 "createdCollectionAutomatically" : false,
 "numIndexesBefore" : 1,
 "numIndexesAfter" : 2,
 "ok" : 1
}

// 4. Use Error Scripts with Logging

// 5. Use HTTP/2 Instead of HTTP
// In addition to these techniques, we can also apply some other techniques like using HTTP/2 over HTTP, as it has the following advantages:

// Multiplexing
// Header compression
// Server push
// Binary format

//6.. Use Redis to Cache the App

// Redis is the advanced version of Memcached. It optimizes the APIs response time by storing and retrieving the data 
// from the main memory of the server. It increases the performance of the database queries which also reduces access latency.

// Here's Node without Redis:

'use strict';

//Define all dependencies needed
const express = require('express');
const responseTime = require('response-time')
const axios = require('axios');

//Load Express Framework
var app = express();

//Create a middleware that adds a X-Response-Time header to responses.
app.use(responseTime());

const getBook = (req, res) => {
  let isbn = req.query.isbn;
  let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  axios.get(url)
    .then(response => {
      let book = response.data.items
      res.send(book);
    })
    .catch(err => {
      res.send('The book you are looking for is not found !!!');
    });
};

app.get('/book', getBook);

app.listen(3000, function() {
  console.log('Your node is running on port 3000 !!!')
});
// And here's Node with Redis:

'use strict';

//Define all dependencies needed
const express = require('express');
const responseTime = require('response-time')
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

//Load Express Framework
var app = express();

//Create a middleware that adds a X-Response-Time header to responses.
app.use(responseTime());

const getBook = (req, res) => {
  let isbn = req.query.isbn;
  let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  return axios.get(url)
    .then(response => {
      let book = response.data.items;
      // Set the string-key:isbn in our cache. With the contents of the cache : title
      // Set cache expiration to 1 hour (60 minutes)
      client.setex(isbn, 3600, JSON.stringify(book));

      res.send(book);
    })
    .catch(err => {
      res.send('The book you are looking for is not found !!!');
    });
};

const getCache = (req, res) => {
  let isbn = req.query.isbn;
  //Check the cache data from the server redis
  client.get(isbn, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getBook(req, res);
    }
  });
}
app.get('/book', getCache);

app.listen(3000, function() {
  console.log('Your node is running on port 3000 !!!')
)};
