// on import express
const express = require('express');
//on importe mongoose
const mongoose = require('mongoose');


const userRoutes = require('./routes/user')

//Création de la fonction qui va communiquer avec notre BD sur MongoDB
mongoose.connect('mongodb+srv://CyrilP6:1234@cluster0.fxbwptu.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// on appelle la methode express pour créer l'application express
const app = express();

////gestion de la requête POST venant du frontend - donne l'accè aux coeur de la requête
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

  // création d'une requeête post envoyé a l'API qui envoie les infos du formulaire signup au format.json  


  app.use('/api/auth', userRoutes);

//on exporte cette capplication pour y acceder depuis les autres fichiers de notre projet, notamment notre server Node
module.exports = app;