var express  = require('express'),
    app = express(),
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
  var command = "tesseract " + req.files.image.path + " /tmp/test_out -psm 7";
  child = exec(command, function(error, stdout, stderr){
	  if (error) throw error;
        	//console.log('stdout: ' + stdout);
                //console.log('stderr: ' + stderr);
                fs.readFile('/tmp/test.txt', function(err,str){
                        if (err) throw err;
                        console.log('File: ' +str);
			res.writeHeader(200, {"Content-Type":"application/json"});
			//res.write();
			var result = [{
				problem: str,
				answer: 2
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
