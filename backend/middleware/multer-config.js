////On configure MULTER pour importer et afficher les images correctement à l'écran
const multer = require('multer');

/////regroupement des différentes extensions d'images 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/////On définit la destination des images 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
/////On assure un nouveau nom de fichier pour ne pas faire de doublons
    filename: (req, file, callback) => {
        const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
module.exports = multer({ storage: storage}).single('image');




