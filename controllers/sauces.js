const Sauces = require('../models/Sauces');

exports.createSauces = (req, res, next) => {
const sauceObject = JSON.parse(req.body.sauce);
delete sauceObject._id;
delete sauceObject._userId;
const sauce = new Sauces ({
  ...sauceObject,
  userId: req.auth.userId,
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
})
sauce.save()
.then(() => {res.status(201).json({message: 'objet enregistré !'})})
.catch(error => {
  console.log(error)
  res.status(400).json({ error })})
};

exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({
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

  exports.modifySauces = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauces),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauces.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Sauces.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

exports.deleteSauces = (req, res, next) => {
  Sauces.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Objet supprimé!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllSauces = (req, res, next) => {
  Sauces.find().then(
    (sauces) => {
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