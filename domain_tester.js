var webPage = require('webpage');
var fs = require('fs');
var path = 'log.txt';
var array_position = 0;
var mydate = new Date();
var now = mydate.valueOf();
var startTime = now;
var timeInSecs = 0;
var successes = 0;
var failures = 0;
var scheme = 'http://www.';
var Prodsites = [
        "dolce.com",
        "surforsound.com",
        "warwickhotels.com",
        "silveradoresort.com",
        "outerbanks.org",
        "newmexico.org"
        ];

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
            (type=="Other" || type=="Undefined") //  type = not by click/submit$
        ) {
            page.close();
            open_website(newurl); // reload on new page
        }
    }
    page.open(url, function(status){
        // Render
        if(status === "success") {
            console.log(" Status: \x1b[32m" + status + '\x1b[0m');
        console.log(" Page Title:  " + page.title);
            console.log('');
            successes++;
            //page.render(array_position + '_example.png');
        } else {
            console.log(' Status: \x1b[31mFailed\x1b[0m');
            console.log('');
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
                    mydate + " ",
                    timeInSecs + " seconds of runtime",
                    Prodsites.length + " domains",
                    successes + " total successes",
                    failures + " total failures",
                    ];
            console.log('Test suite took ' + timeInSecs + ' seconds to complete');
            console.log(' ');
            fs.write(path, logcontent, 'a');
            phantom.exit();
        }
    });
}

open_website();


