//on import jsonwebtoken
const jwt = require('jsonwebtoken');

/*construction d'un middleware qui va nous permettre d'extraire les informations contenues dans le TOKEN,
de vérifier que le token est valide, et de transmettre aux autre middleware ou aux gestionnaires de route*/
module.exports = (req, res, next) => {
    try {
        // on récupère le header et on le split au tour de l'espace
        const token = req.headers.authorization.split(' ')[1];
        // on décode le token avec la methode verify (on récupere le token et la clé secrète)
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        // on récupère le userId contenu dans le token
        const userId = decodedToken.userId;
            //et on rajoute le userId à l'objet requête transmis aux routes appelées par la suite
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
 }
