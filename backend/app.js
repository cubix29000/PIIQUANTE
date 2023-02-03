const express = require('express');
const Mongoose = require('mongoose');
const bodyParser = require('body-parser');
const saucesRoutes = require ('./routes/sauce');
const userRoutes = require ('./routes/user');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const app = express();

//// Connection avec mongoose
Mongoose.connect('.',
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
////Console log pour informer de la bonne connexion via Mongo DB
    .then(() => console.log('La Connexion à MongoDB est un succès !!! '))
    .catch(() => console.log('La connexion à Mongo DB a échoué'));



//////Ci dessous le partage des différentes ressources entre les serveurs on utilise - CORS -
app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

////On fait la gestion des images de manière statiques
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/auth', userRoutes);


///// on exporte l 'application 
module.exports = app;