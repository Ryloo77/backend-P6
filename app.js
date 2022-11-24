//importation  de Dotenv
require('dotenv').config()
//express rate limit
const rateLimit = require("express-rate-limit")
// on importe express (framework qui facilite la création et gestion des serveur Node)
const express = require('express');
//on importe mongoose
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')
const path = require('path')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



//Création de la fonction qui va communiquer avec notre BD sur MongoDB
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// on appelle la methode express pour créer l'application express
const app = express();
// Apply the rate limiting middleware to all requests
app.use(limiter)

//gestion de la requête POST venant du frontend - donne l'accè aux coeur de la requête
//donne l'accès à req.body (le corps de la requête)
app.use(express.json());
/*------------------- DEBUT middleware avec methode GET et POST pour récupérer des éléments -----------*/
//ajout de middleware headers de contrôle d'accès (CORS) qui permettent =
app.use((req, res, next) => {
    //d'acceder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    //d'ajouter des headers mentionnées aux requetes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // création d'une requête post envoyé a l'API qui envoie les infos du au format.json  
  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

//on exporte cette application pour y acceder depuis les autres fichiers de notre projet, notamment notre server Node
module.exports = app;