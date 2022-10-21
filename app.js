// on import express
const express = require('express');
//on importe mongoose
const mongoose = require('mongoose');
// on appelle la methode express pour créer l'application express
const app = express();
//Création de la fonction qui va communiquer avec notre BD sur MongoDB
mongoose.connect('mongodb+srv://CyrilP6:1234@cluster0.fxbwptu.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

////gestion de la requête POST venant du frontend - donne l'accè aux coeur de la requête
app.use(express.json());
/*------------------- DEBUT middleware avec methode GET et POST pour récupérer des éléments -----------*/
//ajout de middleware - headers de contrôle d'accès qui permettent =
app.use((req, res, next) => {
    //d'acceder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    //d'ajouter des headers mentionnées aux requetes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'nouvel user crée!'
    });
  });
//premier arguement de app.use est l'url visé par l'application pour recceuillir les futures données
// app.get('/api/sauces', (req, res, next) => {
//     const sauces = [
//       {
//         userId: 'Pikers',
//         name: 'ma sauce qui pique',
//         manufacturer: 'le fabricant',
//         description: 'La sauce qui repique',
//         mainPepper : 'Ingrédient principal',
//         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//         heat: 'NUMBER note entre 1 ert 10 décrivant la sauce',
//         likes: 'NUMBER nombre de like',
//         dislikes: "NUMBER nombre d'utilisateur qui n'aiment pas",
//         usersLiked: ['string<userId>'],
//         usersDisLiked: ['string<userId>'],
//       },
//       {
//         _id: 'oeihfzeomoihi',
//         title: 'Mon deuxième objet',
//         description: 'Les infos de mon deuxième objet',
//         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//         price: 2900,
//         userId: 'qsomihvqios',
//       },
//     ];
//     res.status(200).json(sauces);
//   });
/*------------------- FIN middleware avec methode get pour récupérer des éléments -----------*/

//on exporte cette capplication pour y acceder depuis les autres fichiers de notre projet, notamment notre server Node
module.exports = app;