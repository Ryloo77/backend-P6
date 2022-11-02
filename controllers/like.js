const Sauces = require('../models/Sauces');

exports.likeSauces = (req, res, next) => {
Sauces.findOne({_id : req.params.id})
    .then((sauce) => {
        console.log(sauce);
        if(sauce.userId.includes(req.body.userId) && req.body.like === 1){
            console.log("true")
        
Sauces.updateOne(
    {_id : req.params.id},
    {
        $inc : {likes: 1},
        $push: { likeSauces : req.body.userId}
    }
)
.then(() => res.satus(201).json ({message :" like +1" }))
.catch(
    (error) => {
        res.status(400).json({
          error: error
        });
      }
);
    }
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    )
    }