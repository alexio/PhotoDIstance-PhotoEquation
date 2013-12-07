var http = require('http'),
    fs = require('fs'),
    sys = require('sys'),
    exec = require('child_process').exec,
    child,
    EventEmitter = require('events').EventEmitter,
    queue = new EventEmitter;

var writeFile = function writeFile(data){
	fs.writeFile('test.tif', data , function(err){
		if (err) throw err;
		child = exec('tesseract test.tif test', function(error, stdout, stderr){
			if (error) throw error;
			
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
		});
	});
}

queue.on('write', writeFile);
console.log('Starting...');
http.createServer(function(req, res){
	
	console.log(req.files);
	
	var body = '';
	var last = '';
	req.on('data', function(chunk){
		//console.log("Chunk111111111111111111111111: " + chunk);
		last = chunk;
		body+=chunk;
	});

	req.on('end', function(){
		var filename = 'test.tiff';
		//filename = 'test.txt';
        	fs.writeFile(filename, body , function(err){
                		if (err) throw err;
                		//console.log("Lastin: " + last);
				
				var junkIndex = last.indexOf("--");
				var junkStr = last.substring(junkIndex);
				console.log("JUNK!: " + junkStr);
				body.replace(junkstr, '');
				//console.log(body);

				var command = 'tesseract /Github/Github/PhotoDIstance-PhotoEquation/server_side/test.tiff /Github/Github/PhotoDIstance-PhotoEquation/server_side/test -psm 7';
				//command = 'ls';
                		child = exec(command, function(error, stdout, stderr){
                        		if (error) throw error;

                        		//console.log('stdout: ' + stdout);
                        		//console.log('stderr: ' + stderr);

					fs.readFile('test.txt', function(err,str){
						if (err) throw err;
						console.log('File: ' +str);
						res.writeHeader(200, {"Content-Type":"application/json"});
        					//res.write();
						var result = {
							eq: '1+1',
							ans: 2
						};
						res.write(JSON.stringify(result));
        					//res.end(JSON.stringify(result));
						res.end();
						console.log("SENT RESPONSE!");
					});
                		});
        	});
	});

}).listen(8988);
