//on import Mongoose
const mongoose = require('mongoose');
//import le package mongoose-unique-validator pour éviter les érreurs de lecture en cas de mail unique
const uniqueValidator = require('mongoose-unique-validator')
//on utilise la fonction schema de mongoose pour créer notre schéma user
const userSchema = mongoose.Schema({
    //On ajoute, unique : true à l'email qui sera assisté du plugin uniqueValidatorpour pour éviter une erreur E11000 spécifique à MongoDB en cas de doublon
    email:{type: String, required:true, unique: true},
    password: {type: String, required: true}
})
//on applique le validateur au schema afin qu'il vérifie les entrées de BD en double et les signale comme n'importe quelle autre erreur
userSchema.plugin(uniqueValidator);
// on export ce schema sous forme de model du nom de "user" pour lequel on passe le userSchema
module.exports = mongoose.model('User', userSchema);