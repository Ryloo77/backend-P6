const Sauces = require('../models/Sauces');

exports.likeSauces = (req, res, next) => {

  const like = req.body.like;
  const userId = req.auth.userId;
  const sauceId = req.params.id;
  console.log(like)
  console.log(userId)
  console.log(sauceId)

  Sauces.findOne({
    sauceId
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

                .then(() => res.satus(201).json({ message: " Dislike +1" }))
                .catch((error) => { res.status(400).json({ error: error }) })
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
                .then(() => res.satus(201).json({ message: " like -1" }))
                .catch((error) => { res.status(400).json({ error: error })})
            }
            else if (sauce.usersDisliked.includes(userId) && like === 0) {
              sauce.updateOne({ _id: sauceId },
                {
                  $inc: { dislikes: -1 },
                  $pull: { usersDisliked: userId }
                }
              )
                .then(() => res.satus(201).json({ message: " Dislike -1" }))
                .catch((error) => { res.status(400).json({ error: error }) })
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

                .then(() => res.satus(201).json({ message: " like +1" }))
                .catch((error) => { res.status(400).json({ error: error }) })
            }
            //l'utilisateur ne peut pas liker s'il est déjà présent dans le tableau


            break;
          default:
            return res.status(500).json({ error });
        }

      }


    )
    .catch((error) => { res.status(400).json({ error }) });
}

// exports.likeSauces = (req, res, next) => {
//         Sauces.findOne({ _id: req.params.id })
//           .then((sauce) => {
//             console.log(req.auth.userId);
//             console.log(sauce.userId);
//             if (!sauce.userId.includes(req.body.userId) && req.body.like === 1) {
//               Sauces.updateOne(
//                 { _id: req.params.id },
//                 {
//                   $inc: { likes: 1 },
//                   $push: { likeSauces: req.body.userId }
//                 }
//               )
//                 .then(() => res.satus(201).json({ message: " like +1" }))
//                 .catch(
//                   (error) => {
//                     res.status(400).json({
//                       error: error
//                     });
//                   }
//                 );
//             }
//           })
//           .catch(
//             (error) => {
//               res.status(400).json({
//                 error: error
//               });
//             }
//           )
//       }