//https://replit.com/@MK-Malz/boilerplate-express-1#.replit

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  console.log(req.method + " " +  req.path + " " + " - " +  req.ip)
  absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath)
})

app.get('/json', function (req, res) {
  absolutePath = __dirname + "/json"
  console.log(req.method + " " +  req.path + " " + " - " +  req.ip)
  if (process.env['MESSAGE_STYLE'] == "uppercase")
  {
      res.json({"message": "HELLO JSON"})
  } else {
      res.json({"message": "Hello json"})
  }

})

app.get('/now', function (req, res, next) {
      req.time = new Date().toString()
       next();
}, function (req, res) {
  res.json({time: req.time})
}
)


app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.post("/name", (req, res) => {
    let fullName = req.body.first + " " + req.body.last
  res.json({
     name: fullName
  });
})


app.use("/public", express.static(__dirname + "/public"));




 module.exports = app;
