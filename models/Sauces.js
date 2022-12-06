/* ---------- Création d'un modèle (schéma) de données qui va permettre de modifier, lire, créer, supprimer ... un objet----------------- */
//on import Mongoose pour créer se schéma
const mongoose = require('mongoose');
//on utilise la fonction schema pour créer notre schéma de donnée qui va forcer a respeceter un modèle de donnée
const saucesSchema = mongoose.Schema({
    userId:{type: String, required:true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required:true},
    likes: {type: Number, default:0},
    dislikes: {type: Number, default:0},
    usersLiked: {type:[String]},
    usersDisliked:{type:[String]},
})

// on exporte ce schema vers notre BD sous forme de model du nom de "Sauces" pour lequel on passe le saucesSchema
module.exports = mongoose.model('Sauces', saucesSchema);