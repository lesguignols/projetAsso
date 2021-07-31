const express = require('express');
require('dotenv').config({ path: './config/.env' });
require('./config/db');





//const pour les variables vers les routes






const priceRoutes = require('./routes/price.routes');







const trainingRoutes = require('./routes/training.routes');










const app = express();













//routes






app.use('/api/price', priceRoutes);







app.use('/api/training', trainingRoutes);

//server
app.listen(process.env.PORT_CRUD, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT_CRUD}`)
})