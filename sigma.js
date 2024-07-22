const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql2');
const { error } = require('console');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n!66Er@',   //haslo do bazy danych
    database: 'rokodb'  // nazwa bazy danych
});



const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {

    
    let mess  = req.body.message;

    let message = mess.trim();
    message = mess.replace(/\s+/g, ' ');   

if(message.length > 2 && message.length <= 500)
{

            let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress;      
            if (ip.startsWith('::ffff:')) {
               ip = ip.replace('::ffff:', '');
            }            

            message = message.trim();
            console.log(ip);
            console.log(message);
            var currentdate = new Date(); 
             var datetime =
            currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

            console.log(datetime);

            pool.getConnection(function (err, connection) {
                if(err instanceof Error) {
                        console.log(err);
                        return;
                }           

            connection.query('INSERT INTO tells (date, ip, message) VALUES (?, ?, ?)', 
            [datetime, ip, message],
            (error,  results) => {
                    if (error){
                         return res.json({ error: error });
                    }

                res.send('Message received');
            }
            );
                connection.release(); 
            });
            }
                else{
                res.status(400).send("Wiadomosc musi zawierac od 3 do 500 znakow");
           }

        });



            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });


