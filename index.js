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
