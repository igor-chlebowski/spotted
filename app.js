const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4200;

const salt = '$2b$10$D9F7cBlg1q3nThIZyM8DzP';
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Fake user database

    
const login = '5HaNuK@';
const haslo = '$2b$10$D9F7cBlg1q3nThIZyM8DzOpYSjD7fjuMsrECLmH1LXCEs9nmVIXw6';



// Render the login page
app.get('/', (req, res) => {
    res.render('login');
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    
    console.log(password);
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
            console.error('Błąd podczas haszowania hasła:', err);
            return;
        }
    
    
        console.log('Hasz:', hash);
        if(login == username && hash == haslo){
            res.send("zalogowano pomyslnie!");
    
        }
        else{
            res.send("bledny login lub haslo");
            
        }
    });


});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});