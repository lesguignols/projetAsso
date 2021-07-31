const express = require('express');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { checkAdherent, requireAuth } = require('./middleware/auth.middleware');


//const pour les variables vers les routes
const adherentRoutes = require('./routes/adherent.routes');





const priceRoutes = require('./routes/price.routes');



const settingsRoutes = require('./routes/settings.routes');



const trainingRoutes = require('./routes/training.routes');










const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get('*', checkAdherent);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.adherent.id)
})


//routes
app.use('/api/adherent', adherentRoutes);





app.use('/api/price', priceRoutes);







app.use('/api/training', trainingRoutes);

//server
app.listen(process.env.PORT_CRUD, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT_CRUD}`)
})