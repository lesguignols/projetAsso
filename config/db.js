const mongoose = require('mongoose');

mongoose
    .connect(`${process.env.DB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("Bien connecté à MongoDB Atlas"))
    .catch((err) => console.log("Failed to connect to MongoDB Atlas", err));