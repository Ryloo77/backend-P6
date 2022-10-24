//on import Mongoose
const mongoose = require('mongoose');
//on utilise la fonction schema pour créer notre schéma de donnée
const saucesSchema = mongoose.Schema({
    userId:{type: String, required:true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required:true},
    // likes: {type: Number},
    // dislikes: {type: Number},
    // usersLiked: {type:String},
    // usersDisliked:{type:String}
})

// on exporte ce schema vers notre BD sous forme de model du nom de "sauces" pour lequel on passe le userSchema
module.exports = mongoose.model('Sauces', saucesSchema);