var express = require('express');
const app = exports.module = express();

const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/frontend'));

app.get('/index.html', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/test', function(req, res) {
  var lName = req.body.lname;
  var number = req.body.numbers;
  res.send();
})

const port = 3000;
const host = '11.0.0.39' // <---    tutaj wpisz swoj adres ip (w konsoli linuxa wpisz ifconfig zeby znalezc swoje ip !!)

app.listen(port, host, () =>{

    console.log(`server running at : http://${host}:${port}/`);

});