//on import Mongoose
const mongoose = require('mongoose');
//import le package mongoose-unique-validator installer pour éviter les érreurs de lecture en cas de mail unique
const uniqueValidator = require('mongoose-unique-validator')
//on utilise la fonction schema pour créer notre schéma
const userSchema = mongoose.Schema({
    email:{type: String, required:true, unique: true},//unique pour qu'il n'y a deux fois le même mail
    password: {type: String, required: true}
})
//on applique le validateur au schema avant d'en faire un model
userSchema.plugin(uniqueValidator);
// on export ce schema sous forme de model du nom de "user" pour lequel on passe le userSchema
module.exports = mongoose.model('User', userSchema);