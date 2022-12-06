//oon importe notre modèle user
const User = require('../models/User')
// on importe le package de crypatge pour le hashage des mots de passe (bcrypt)
const bcrypt = require('bcrypt');
//On importe jsonwebToken (permet de creer des tokens concernant les userId et les vérifier)
const jwt = require('jsonwebtoken')
//on importe le package email validator
const mailValidator = require('email-validator')

exports.signup = (req, res, next) => {
    //on applique mailValidator pour vérifier l'email et on ajoute une erreur en cas de mail invalide (false)
    const mailIsValide = mailValidator.validate(req.body.email)
    if(!mailIsValide) {
        return res.status(400).json ({ message : "email invalide"})
    }
    //on commence par hacher le mot de passe avec bcrypt.hash après l'avoir récupéré et on execute 10 fois l'algorythme de hashage
    bcrypt.hash(req.body.password, 10)
        // on récupère le hash de mot de passe
        .then(hash => {
            // on crée notre nouveau user et on récupère le hash du mot de passe
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // on sauvegarde notre user dans la BD
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    // on vérifie si l'utilisateur existe dans notre BD
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
            } else {
                // on compare le mot de passe transmis avec celui de la BD avec la methode compare de bcrypt
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            // le mot de passe est incorrecte
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
                        } else {
                            //si le mot de passe est correct, on retourne un objet qui contient les infos nécéssaires à l'envoie des requêtes par le client :
                            res.status(200).json({
                                // l'userId
                                userId: user._id,
                                //un Token
                                token: jwt.sign(
                                    //1er argument on encode l'userId avec jsonwebtoken (on passe les arguments que l'on veut encoder)
                                    { userId: user._id },
                                    //2eme arguemnts qui est la clé secrète pour l'encodage
                                    process.env.SECRET_TOKEN,
                                    //3eme arguments pour un délaid'expiration de validité du token
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error })
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}