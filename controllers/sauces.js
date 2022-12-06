const Sauces = require('../models/Sauces');
//importation de fs (file system) qui permet de modifier le système de fichier (y compris la suppression). Il nous servira pour les images du du dossier images
const fs = require('fs');

/* -------------------------- Logique Metiers de chaque route-------------------------------*/
//Création d'une sauce
exports.createSauces = (req, res, next) => {
  //après l'ajout de Multer, le format de la requête à changé. il faut parser le nouvel objet qui est envoyé sous forme json en STRING
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId; //on supprime le userId de l'objet pour des raisons de sécurité
  const sauce = new Sauces({
    //on récupère la requête
    ...sauceObject,
    //on extrait l'userId de notre objet requête (userId sécurisé par le token)
    userId: req.auth.userId,
    //on génère l'URL de l'image 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sauce.save()
    .then(() => { res.status(201).json({ message: 'objet enregistré !' }) })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error })
    })
};

//On va chercher une seule sauce en fonction de son id
exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({
    //l'id de la sauce doit correspondre au paramètre de requête(.../sauce/:id)
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//modification d'une sauce (route PUT)
exports.modifySauces = (req, res, next) => {
  const sauceObject = req.file ? {
    ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;//on supprime l'userId par mesure de sécurité
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'unauthorized request' });
      } else {
        // si req.file existe, une nouvelle image arrive, on supprime l'ancienne
        if (req.file) {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            // methode updateOne pour mettre à jour.
            Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Objet modifié!' }))
              .catch(error => res.status(401).json({ error }));
          })
          //sinon, on ne change pas l'image et un update les changemements
        } else {
          Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié!' }))
            .catch(error => res.status(401).json({ error }));
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//suppression d'une sauce
exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        //on utilise fs.unlink pour supprimer un fichier (ici l'image)
        fs.unlink(`images/${filename}`, () => {
          Sauces.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

//récupération des éléments sauces du tableau (page ALL SAUCES)
exports.getAllSauces = (req, res, next) => {
  Sauces.find().then(
    (sauces) => { //sauces de la base de donnée
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

