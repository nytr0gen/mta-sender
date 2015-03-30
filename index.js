var lineReader = require('line-reader');
var fs = require('fs');
var Sender = require('./Sender');

var html = fs.readFileSync('body.html');
var subject = 'Hello World';
var emailFrom = 'test@example.com';
var maxJobs = 1;
var mta = new Sender(maxJobs);

lineReader.eachLine('emails', function(emailTo, last) {
    mta.send({
        'to': emailTo,
        'from': emailFrom,
        'subject': subject,
        'html': html
    });
});