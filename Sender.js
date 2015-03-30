var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var options = {
    'name': 'mta5.am0.yahoodns.net',
    'debug': true
};

var Sender = function(maxJobs) {
    this.maxJobs = maxJobs;
    this.job = 0;
    this.transporter = [];
    for (var i = 0; i < this.maxJobs; i++) {
        this.transporter[i] = nodemailer.createTransport(directTransport(options));

        this.transporter[i].on('log', function(msg) {
            if (msg.type == 'direct') {
                console.log('Job: ', i, ' - ', msg.message);
            }
        });
    }
};

module.exports = Sender;

Sender.prototype.send = function(opts) {
    this.job = (this.job + 1) % this.maxJobs;
    opts.xMailer = false;
    this.transporter[this.job].sendMail(opts);
}