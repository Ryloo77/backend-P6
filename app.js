// on import express
const express = require('express');
//on importe mongoose
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces')
//const Sauces = require('./models/Sauces')
const userRoutes = require('./routes/user')
const path = require('path')

//Création de la fonction qui va communiquer avec notre BD sur MongoDB
mongoose.connect('mongodb+srv://CyrilP6:1234@cluster0.fxbwptu.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// on appelle la methode express pour créer l'application express
const app = express();

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

  // app.post('/api/sauces', (req, res, next) => {
  //   const sauce = new Sauces({
  //     ...req.body
  //   });
  //   sauce.save()
  //   .then(() => res.status(201).json({message: 'objet enregistré !'}))
  //   .catch(error => {
  //     console.log(error)
  //     res.status(400).json({ error: error })
  //   });
    
  // });

  // app.get('/api/sauces', (req, res, next) => {
  //   const sauce = [
  //     {
  //   userId:'Denis77',
  //   name: 'Durand',
  //   manufacturer: 'fait dans la ferme familiale',
  //   description: 'la meilleur sauce piquante du village',
  //   mainPepper: 'piments doux et moins doux',
  //   imageUrl: 'https://cdn.shopify.com/s/files/1/0020/9417/0167/products/tabasco-sauce-pepper-011210000018-35356698181795_1200x.progressive.jpg?v=1660320380',
  //   heat: 3,
  //   // likes: 4,
  //   // dislikes: 1,
  //   // usersLiked:[userId],
  //   // usersDisliked:[userId]
  //     },
  //     {
  //     userId: 'Loulou12',
  //     name: 'leloup',
  //     manufacturer: "chez l'autre",
  //     description: 'ça pique',
  //     mainPepper: 'espelette',
  //     imageUrl: 'https://media.cdnws.com/_i/48378/8984/224/88/sauce-piquante-tonnerre-pur-cru-habanero-jaune.jpeg',
  //     heat: 4,
  //     // likes: 2,
  //     // dislikes: 0,
  //     // usersLiked:[userId],
  //     // usersDisliked:[userId]
  //     },
  //   ];
  //   res.status(200).json(sauce);
  /* récupération de l'objet crée */
    //  Sauces.find()
  //  .then(sauces => res.status(200).json(sauces))
  //  .catch(error => res.status(400).json({ error }))
  // });

  // création d'une requête post envoyé a l'API qui envoie les infos du formulaire  au format.json  
  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

//on exporte cette application pour y acceder depuis les autres fichiers de notre projet, notamment notre server Node
module.exports = app;