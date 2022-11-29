//importation  de Dotenv
require('dotenv').config()
//express rate limit
const rateLimit = require("express-rate-limit")
// on importe express (framework qui facilite la création et gestion des serveur Node)
const express = require('express');
//on importe mongoose pour communiquer avec MongoDB
const mongoose = require('mongoose');

    /* -------------------------- Importation des routers -------------------------------*/
const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')
    /* -------------------------- Fin d'importation des routers-------------------------------*/

const path = require('path')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



    /* -------------------------- Logique de connexion à MongoDB -------------------------------*/
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
    /* -------------------------- Fin Logique de connexion à MongoDB -------------------------------*/

// on crée la constante app qui appelle la methode express
const app = express();
// Apply the rate limiting middleware to all requests
app.use(limiter)

//gestion de la requête POST venant du frontend - donne l'accè aux coeur de la requête
//donne l'accès à req.body (le contenu du corps de la requête)
app.use(express.json());
//ce middleware intercepte toutes les requetes quoi contiennent du json et nous mettes a disposition le corps de la requete sur l'objet requete dans req.body

    /* -------------------------- Gestion du CORS (interaction entre serveurs et navigateurs) -------------------------------*/
//ajout de middleware headers de contrôle d'accès (CORS) qui permettent =
app.use((req, res, next) => {
    //d'acceder à notre API depuis n'importe quelle origine car nous avons deux origines différentes (localhost 3000 et 4200)
    res.setHeader('Access-Control-Allow-Origin', '*');
    //d'ajouter des headers mentionnées aux requetes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        //Tout cela va permettre à l'application d'acceder à l'API sans souci
    next();
  });
    /* -------------------------- fin gestion du CORS -------------------------------*/
 
    /* -------------------------- utilisation des routers avec les début de chaque routes -------------------------------*/
  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

//on exporte cette application pour y acceder depuis les autres fichiers de notre projet, notamment notre server Node
module.exports = app;