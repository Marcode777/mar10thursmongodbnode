var express = require("express");
var app = express();
var PORT = 8080;
var mongojs = require("mongojs");
var db = mongojs("zoo", ["animals"])
db.on("error", function (err){
  console.log("database error happened:" + err)
})

app.get('/', function(req, res){
  res.send("Hello World!");
})

app.get('/animals', function(req, res){
  db.animals.find({}, function(err, documents){
    if(err){
      console.log(err);
    } else {
      res.json(documents);
    }
  })
})

app.get('/weight', function(req, res){
  db.animals.find().sort({weight: 1}, function(err, documents){
    if(err){
      console.log(err);
    } else {
      res.json(documents);
    }
  })
})

app.listen(PORT, function(){
  console.log("Listening on Port" + PORT)
})



//make sure you type the correct route in the url in the browser    localhost:8080/animals