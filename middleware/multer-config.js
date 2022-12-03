// on importe le package multer pour facilité la gestion de fichiers envoyés avec des requêtes http vers notre API
const multer = require('multer');

//dictionnaire de MIME_TYPES
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/*------------ création d'un objet de configuration pour multer ---------------*/
//création de la destination de l'image importée. 2 éléments :
const storage = multer.diskStorage({
    //la destination (dossier images)
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    //quels sont les noms de fichiers à utiliser
    filename: (req, file, callback) => {
        //nom d'origine du fichier pour lequel on supprime les éventuelles espaces avec la methode split (on squiz)
        const name = file.originalname.split(' ').join('_');
        //on applique un extention au fichier avec les MIME_TYPES
        const extension = MIME_TYPES[file.mimetype];
        //on appelle le callback : name passé au dessus + times type + . + extentions du fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

//On exporte notre middleware multer configuré en appelant la methode pour un fichier unique d'image
module.exports = multer({ storage }).single('image');