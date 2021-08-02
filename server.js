const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkAdherent, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');

//const pour les routes
const adherentRoutes = require('./routes/adherent.routes');
const billRoutes = require('./routes/bill.routes');
const cashRoutes = require('./routes/cash.routes');
const cashFundRoutes = require('./routes/cashfund.routes');
const inventoryRoutes = require('./routes/inventory/inventory.routes');
const inventorySupposedRoutes = require('./routes/inventory/inventory.supposed.routes');
const offerRoutes = require('./routes/offer.routes');
const priceRoutes = require('./routes/price.routes');
const productRoutes = require('./routes/product.routes');
const providerRoutes = require('./routes/provider.routes');
const reductionRoutes = require('./routes/reduction.routes');
const settingsRoutes = require('./routes/settings.routes');
const saleRoutes = require('./routes/sale.routes');
const slipCoinsRoutes = require('./routes/slip/coins.routes');
const slipTicketRoutes = require('./routes/slip/ticket.routes');
const trainingRoutes = require('./routes/training.routes');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

const app = express();
app.use(cors(corsOptions));

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
app.use('/api/bill', billRoutes);
app.use('/api/cash', cashRoutes);
app.use('/api/cashfund', cashFundRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/inventorysupposed', inventorySupposedRoutes);
app.use('/api/offer', offerRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/product', productRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/reduction', reductionRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/slipcoins', slipCoinsRoutes);
app.use('/api/slipticket', slipTicketRoutes);
app.use('/api/training', trainingRoutes);

//server
app.listen(process.env.PORT_CRUD, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT_CRUD}`)
})