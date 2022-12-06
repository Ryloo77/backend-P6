//importation  de Dotenv
require('dotenv').config()
//on importe rateLimite d'Express utile pour limiter les demandes répétées
const rateLimit = require("express-rate-limit")
// on importe express (framework qui facilite la création et gestion des serveurs Node)
const express = require('express');
//on importe mongoose pour communiquer avec MongoDB
const mongoose = require('mongoose');

    /* -------------------------- Importation des routers -------------------------------*/
const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')
    /* -------------------------- Fin d'importation des routers-------------------------------*/

// on importe path pour la récupération de fichier join (utilisé par la route vers le dossier image)
const path = require('path')

//Configuration de rate-limit pour limiter le débit à toutes les requetes dans le serveur
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limite chaque IP à 100 requêtes par "fenêtre" (ici, par 15 minutes)
	standardHeaders: true, // renvoi les informations de limite de taux dans les entête 'ratelimit'
	legacyHeaders: false, // Désactive les entêtes rate-limit
})



    /* -------------------------- Logique de connexion à MongoDB -------------------------------*/
// on appelle notre code de connexion de connexion MONGO_URL contenu dans le dossier .env
    mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
    /* -------------------------- Fin Logique de connexion à MongoDB -------------------------------*/

// on crée la constante app qui appelle la methode express
const app = express();
//On applique le middleware de limitation sur toutes les requêtes
app.use(limiter)
//Middleware qui intercepte les requêtes ayant un contenu json (POST) et met a disposition le contenu (le corps de la requête) sur l'objet requête (dans "req.body")
app.use(express.json());
//bodyparser etait utilisé avant la méthode ci dessus

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
  app.use('/api/sauces', saucesRoutes);//pour la route /api/sauces on utilise le router saucesRoutes
  app.use('/api/auth', userRoutes);
  //utilisation d'express.static (middleware) pour permettre l'accès à des ressources statiques tel que les images
  app.use('/images', express.static(path.join(__dirname, 'images')));

//on exporte cette application pour y acceder depuis les autres fichiers de notre projet, notamment notre server Node
module.exports = app;