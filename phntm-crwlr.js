var page = require('webpage').create();
var array_position = 0;

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


function open_website(){
    // Open website
    console.log('Opening: ' + scheme  + arrayProdsites[array_position]);
    page.onError = function (msg, trace) {
      console.log(msg);
    };
    page.onNavigationRequested = function(newurl, type, willNavigate, main) {
      if (    
            main && 
	url != newurl &&
            (type=="Other" || type=="Undefined") //  type = not by click/submit etc
        ) {
            newurl = newurl.replace(/www\./, "");
            page.close();
            open_website(newurl); // reload on new page
        }
    }
    page.open(scheme + arrayProdsites[array_position], function(status){
        console.log(status);
        // Render
        if(status === "success") {
            console.log(" Status: " + status);
            console.log('');
            //page.render(array_position + '_example.png');
        } else {
            console.log(' Status: Failed');
            console.log('');
        }

        // Increment
        array_position++;
        page.close();

        // Go to the next or exit
        if(arrayProdsites.length !== array_position){
            open_website();
        } else {
            phantom.exit();
        }
    });
}

open_website();


