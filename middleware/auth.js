const jwt = require('jsonwebtoken');

/*construction d'un middleware qui va nous permettre d'extraire les informations contenues dans le TOKEN,
de vérifier que le token est valide, et de transmettre aux autre middleware ou aux gestionnaires de route*/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
 }
