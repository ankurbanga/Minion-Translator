let outstring="works!"
let unirest=require('unirest');
let express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.post("/",function(req,res){
	unirest.post("https://api.funtranslations.com/translate/minion.json?text="+req.body.eng)
	.end(function(result){
		console.log(result.body,result.headers);
		res.end('Translated :'+ result.body.contents.translated);
	});

});

app.listen(3000);
console.log("Server started on port 3000");
