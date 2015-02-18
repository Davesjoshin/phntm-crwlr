var webPage = require('webpage');
var array_position = 0;
var successes = 0;
var failures = 0;
var arrayProdsites = [
        "cobnks.com",
        "aertsonmidtown.com",
        "hillcrestbank.com",
        "nbhbank.com",
        "foodwinerum.com",
        "visitbarbados.org",
        "bradentongulfislands.com",
        "visitcabarrus.com",
        "paradisebymarriott.com",
        "admin.paradisebymarriott.com",
        "thevenetianroom.com",
        "casadecampo.com.do",
        "cityway.com",
        "clubquarters.com",
        "davenporthotelcollection.com",
        "dmomojo.com",
        "dolcehotels.es",
        "ironworkshotel.com",
        "ironworksindy.com",
        "kerzner.com",
        "fortmyers-sanibel.com",
        "fortmyers-sanibel.com/island-hopper/",
        "marcam-images.com/",
        "mmgyglobal.com",
        "mortgagelendersofamerica.com",
        "nationalgeographicexpeditions.com",
        "newmexico.org",
        "newmexico.org/trails/",
        "thehomestead.com",
        "rancholaspalmas.com",
        "lacosta.com",
        "montelucia.com",
        "outerbanks.org",
        "rancholaspalmas.com",
        "kcrestaurantweek.com",
        "bankmw.com"
        ];

var scheme = 'http://www.'


function open_website(url){
    // Open website
    var action = '\x1b[33mRedirected\x1b[0m: ';
    if (!url) {
        url = scheme + arrayProdsites[array_position] + '/';
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
            (type=="Other" || type=="Undefined") //  type = not by click/submit etc
        ) {
            page.close();
            open_website(newurl); // reload on new page
        }    
    }
    page.open(url, function(status){
        // Render
        if(status === "success") {
            console.log(" Status: \x1b[32m" + status + '\x1b[0m');
            console.log('');
            successes++;
            //page.render(array_position + '_example.png');
        } else {
            console.log(' Status: \x1b[31mFailed\x1b[0m');
            console.log('');
            failures++;
        }

        // Increment
        array_position++;
        page.close();

        // Go to the next or exit
        if(arrayProdsites.length !== array_position){
            open_website();
        } else {
            console.log(successes + ' successes, ' + failures + ' failures');
            phantom.exit();
        }
    });
}

open_website();


