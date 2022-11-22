const Sauces = require('../models/Sauces');

exports.likeSauces = (req, res, next) => {

  const like = req.body.like;
  const userId = req.auth.userId;
  const sauceId = req.params.id;
  console.log(like)
  console.log(userId)
  console.log(sauceId)

  Sauces.findOne({
    _id: sauceId
  })
    .then(
      (sauce) => {
        switch (like) {
          case -1:
            if (!sauce.usersDisliked.includes(userId) && like === -1) {
              Sauces.updateOne({ _id: sauceId },
                {
                  $inc: { dislikes: 1 },
                  $push: { usersDisliked: userId }
                }
              )

                .then(() => res.status(200).json({ message: "dislike ajouté" }))
                .catch((error) => { res.status(400).json({ error: "erreur lors du dislike" }) })
            }
            //ajout d'un message d'erreur si l'utilisateur a déjà disliké
            else if (sauce.usersDisliked.includes(userId) && like === -1) {
              res.status(400).json({ error: "dislike déjà enregistré"})
            }
            break;

          case 0:
            //l'utilisateur peut annuler son like s'il est déjà présent dans le tableau usersLiked ou usersDeslikes
            if (sauce.usersLiked.includes(userId) && like === 0) {
              Sauces.updateOne({ _id: sauceId },
                {
                  $inc: { likes: -1 },
                  $pull: { usersLiked: userId }
                }
              )
                .then(() => res.status(200).json({ message: " like enlevé" }))
                .catch((error) => { res.status(400).json({ error: "erreur sur l'annulation du like" })})
            }
            else if (sauce.usersDisliked.includes(userId) && like === 0) {
              Sauces.updateOne({ _id: sauceId },
                {
                  $inc: { dislikes: -1 },
                  $pull: { usersDisliked: userId }
                }
              )
                .then(() => res.status(200).json({ message: " dislike enlevé" }))
                .catch((error) => { res.status(400).json({ error: "erreur sur l'annulation du dislike" }) })
            }
          break;

          case 1:
            //l'utilisateur peut liker s'il n'est pas déja présent dans le tableau des like
            if (!sauce.usersLiked.includes(userId) && like === 1) {
              Sauces.updateOne({ _id: sauceId },
                {
                  $inc: { likes: 1 },
                  $push: { usersLiked: userId }
                }
              )

                .then(() => res.status(200).json({ message: " like ajouté" }))
                .catch((error) => { res.status(400).json({ error: "erreur lors du like" }) })
            }
            else if (sauce.usersLiked.includes(userId) && like === 1) {
              res.status(400).json({ error: "like déjà enregistré"})
            }
            //l'utilisateur ne peut pas liker s'il est déjà présent dans le tableau


            break;
          default:
            return res.status(500).json({ error : "erreur inconnue" });
        }

      }


    )
    .catch((error) => { res.status(400).json({ error }) });
}
