var fs = require('fs');

function reader(){
	 fs.readFile('1_1_1_1_1_copia.tiff', function(err, str){
             if (err) throw err;
		       console.log("Stuff: " + str);
	 });
}

reader();
