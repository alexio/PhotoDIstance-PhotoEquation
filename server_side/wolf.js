var wolfram = require('wolfram-alpha').createClient('G4A8VK-WRV3WA595H');

wolfram.query("3*9", function (err, result) {
	  if (err) throw err;
	    console.log("Result: %j", result);
});
