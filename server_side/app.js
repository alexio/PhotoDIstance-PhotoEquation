var http = require('http'),
    fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    queue = new EventEmitter;

var writeFile = function writeFile(data){
	console.log("Writing...");
	fs.writeFile('man.txt', data , function(err){
		if (err) throw err;
		console.log("Write worked");
	});
}

queue.on('write', writeFile);
console.log('Starting...');
http.createServer(function(req, res){
	
	var body = '';
	req.on('data', function(chunk){
		console.log("Chunk: " + chunk);
		body+=chunk;
	});

	req.on('end', function(){
		console.log("done");
		queue.emit('write', body);	
	});

	res.writeHeader(200, {"Content-Type":"text/plain"});
	res.write("Hi Sexy");
	res.end();
}).listen(8988);
