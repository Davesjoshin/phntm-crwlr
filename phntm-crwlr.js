var page = require('webpage').create();
var letters = [
	"a", "b", "c", "d",	"e", "f", "g",
	"h", "i", "j", "k",	"l", "m", "n",
	"o", "p", "q", "r",	"s", "t", "u",
	"v", "w", "x", "y", "z", "0", "1",
	"2", "3", "4", "5",	"6", "7", "8",
	"9"
];

var domain = [
	".com",
	".org",
	".net",
	".gov",
	".mil",
	".edu"
];

for (i=0;i<letters.length;i++) {
	for (d=0;d<domain.length;d++){
		var url = 'http://www.'+letters[i]+domain[d];
		console.log(url);
		page.open(url, function() {
  		page.render('example.png');
  		phantom.exit();
		});

	};
};

