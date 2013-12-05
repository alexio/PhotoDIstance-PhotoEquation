var http = require('http');

var options = {
    host: '198.211.114.151',
    port: 8988,
    method: 'POST',
  /*  headers: {
        accept: 'application/json'
    }*/
};

console.log("Start");
var req = http.request(options,function(res){
    console.log("Connected");
    res.on('data',function(data){
        console.log(data);
    });
});

req.write("Test Data\n");
req.write("End\n");
req.end();
