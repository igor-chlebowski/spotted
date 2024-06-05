const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql2');
const { error } = require('console');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6etd%?gTN!223',   //haslo do bazy danych
    database: 'rokodb'  // nazwa bazy danych
});



connection.connect((err) => {

    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

const port = 3000;
const host = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {

    
    let message = req.body.message;

    message = message.trim();
    

if(message.length > 2 && message.length <= 500)
{

            var ip = req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress ||
            null;
            
            console.log(ip);
            console.log(`${message}`);
            var currentdate = new Date(); 
            var datetime =
            currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
            
            console.log(datetime);
            
            
            connection.query('INSERT INTO tells (date, ip, message) VALUES (?, ?, ?)', [datetime, ip, req.body.message],(error,  
                results) => {
                    if (error) return res.json({ error: error });
                    
                });
                res.send('Message received');
            }
                
            });
            
            
            
            
            app.listen(port, host, () => {
                console.log(`Server is running on port ${port}`);
            });