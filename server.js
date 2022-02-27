

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

const axios = require('axios');

async function makeGetRequest() {

  let res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=02951409c4104386b21d0b052aeb2078');

  let data = JSON.stringify(res.data);
  fs.writeFile('data.json', data, err => {
    // error checking
    if(err) throw err;
});
}

makeGetRequest();
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

console.log(JSON.parse(data)["articles"][1]["urlToImage"]);
