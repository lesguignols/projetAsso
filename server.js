const express = require('express');
require('dotenv').config({ path: './config/.env' });
require('./config/db');

const app = express();

//server
app.listen(process.env.PORT_CRUD, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT_CRUD}`)
})