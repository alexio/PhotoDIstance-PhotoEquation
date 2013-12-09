var express  = require('express'),
    app = express(),
    wolfram = require('wolfram-alpha').createClient('G4A8VK-WRV3WA595H'),
    fs = require('fs'),
    exec = require('child_process').exec;
 
//Express's powerful parser
app.use(express.bodyParser())
 
//To test on browser root url is a simple html form to upload files
app.get('/', function(req, res){
  res.send(
      '<form action="/upload" method="post" enctype="multipart/form-data">'+
      '<input type="file" name="source">'+
      '<input type="submit" value="Upload">'+
      '</form>'
  );
});
 
//The upload picture request handler
app.post('/', function(req, res){
  //This debugging meassage displays all the info that comes with the file
  console.log("Received file:\n" + JSON.stringify(req.files));
 
  //Set the directory names
  var photoName = req.files.image.name;
  console.log(" Photo: " + photoName);
///  var command = "tesseract " + req.files.image.path + " /tmp/test_out -psm 7";
  //command = "tesseract /tmp/sample.tiff /tmp/sample -psm 7";
  
var nodecr = require('node-tesseract');

// Recognise text of any language in any format
nodecr.process(req.files.image.path,function(err, text) {
    if(err) {
        console.error(err);
    } else {
        console.log("GETTING : " + text);
    }
});




child = exec(command, function(error, stdout, stderr){
	  if (error) throw error;
        	console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                fs.readFile('/tmp/test_out.txt', function(err,str){
                        if (err) throw err;
                        console.log('File: ' +str);
			var answer = '';
			var equation = '';
			

			wolfram.query(String(str), function (err, result) {
	  			if (err) throw err;
	    			
				if(result.length != 0){
					console.log("Result: %j", result);
					answer = result[1].subpods[0].text;
					equation = result[0].subpods[0].text;
				}
			});
			res.writeHeader(200, {"Content-Type":"application/json"});
			//res.write();
			var result = [{
				problem: equation,
				answer: answer
			}];
			res.write(JSON.stringify(result));
			//res.end(JSON.stringify(result));
			res.end();
			console.log("SENT RESPONSE!");
                });
  });
  //We use Node's FileSystem to rename the file, which actually moves it from the /tmp/ folder it goes to on Linux
});
 
app.listen(8999);
