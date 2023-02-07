const express = require('express');
const router = express.Router();

const sauceCTRL = require('../controllers/sauce');
////Le middle ci présent permet l authentification des pages de l'application 
const auth = require('../middleware/auth');
////l'utilisation de ce middle permet de définir le chemin, la destination ainsi que l'intitulé des fichiers images de l 'application, il faut multer les images
const multer = require('../middleware/multer-config');

////on défini les routes pour les informations des sauces de l'api pour les différentes requêtes
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);

module.exports = router;