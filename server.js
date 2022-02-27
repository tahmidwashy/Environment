

const sass = require('sass');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express();

app.use(express.json()); //Used to parse JSON bodies (needed for POST requests)
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('public')); //specify location of static assests
app.set("home", __dirname + '/home'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

var request = require("request");

var options = { method: 'GET',
  url: 'http://api.planetos.com/v1/datasets',
  qs: { apikey: '03fbf7ec0ded4558ac5a4452b4ecc178' },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  // console.log(body);
  var result = JSON.parse(body)
  fs.writeFileSync( 'data.json', JSON.stringify(result))

  console.log(result)
});

data = fs.readFileSync("data.json", "utf8")
app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  console.log(request.cookies['username'])
  response.render("home",{
    "data": JSON.parse(data)
  });
});

app.get('/notes', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  console.log(request.cookies['username'])
  response.render("notespage",{
    "username": request.cookies['username']
  });
});

app.get('/article', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  console.log(request.cookies['username'])
  response.render("articlenum",{
    "username": request.cookies['username']
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+ port+'.')
});
