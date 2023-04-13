const express = require('express');

const app = express();

require('./server/config/db');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");

app.use(require('./server/pages/router'));
app.use(require('./server/auth/router'));

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is listening to Port ${PORT}`);
});

