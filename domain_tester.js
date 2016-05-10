// Modules that we need
var webPage = require('webpage');
var fs = require('fs');
var path = 'log.txt';

// Working out date stuff for output log
var mydate = new Date();
var now = mydate.valueOf();
var localtime = mydate.toLocaleString();
var startTime = now;
var timeInSecs = 0;

// Starting the count at zero
var successes = 0;
var failures = 0;
var array_position = 0;

// Pieces to construct a domain
var scheme = 'http://www.';
var Prodsites = [
"reddit.com",
"bitpi.co",
"yetichute.com",
"news.ycombinator.com"
];

// Welcome readout
console.log(" ");
console.log("*** Domain Tester ***");
console.log(" ");
function open_website(url){

// Open website
var action = '\x1b[33mRedirected\x1b[0m: ';
if (!url) {
url = scheme + Prodsites[array_position] + '/';
action = 'Opening: ';
}
var page = webPage.create();
console.log(action + url);
page.onError = function (msg, trace) {
console.log(msg);
};
page.onNavigationRequested = function(newurl, type, willNavigate, main) {
if (
main &&
url != newurl &&
(type=="Other" || type=="Undefined") // type = not by click/submit$
) {
page.close();
open_website(newurl); // reload on new page
}
}
page.open(url, function(status){

// Render
if(status === "success") {
console.log(" Status: \x1b[32m" + status + '\x1b[0m');
console.log(" Page Title: " + page.title);
console.log('');
successes++;

// page.render(array_position + '_example.png');
} else {
console.log(' Status: \x1b[31mFailed\x1b[0m');
console.log(' Creating screenshot: ' + '\x1b[33m' + Prodsites[array_position] + '.png' + '\x1b[0m');
console.log('');
page.render(Prodsites[array_position] + '.png');


// page.render(startTime + '.png');
failures++;
}

// Increment
array_position++;
page.close();

// Go to the next or exit
if(Prodsites.length !== array_position){
open_website();
} else {
console.log(successes + ' successes, ' + failures + ' failures');
var endTime = new Date().valueOf();
var timeDiff = endTime - startTime;
timeInSecs = timeDiff/1000;
var logcontent = [
localtime,
" " + timeInSecs + " runtime secs",
" " + Prodsites.length + " domains",
" " + successes + " successes",
" " + failures + " failures"
];
console.log('Test suite took ' + timeInSecs + ' seconds to complete');
console.log(' ');
fs.write(path, logcontent, 'a');
fs.write(path, "\n", 'a');
phantom.exit();
}
});
}
open_website();
