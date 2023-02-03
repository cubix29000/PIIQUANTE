const express = require('express');
const router = express.router();
////On intègre le package et la prévention sur l'intensité 
const rateLimit = require('express-rate-limit');
const userCtrl = require('./controllers/user');

////On définit la route POST (requête envoyée par le frontend) quand l'utilisateur se créer un compte ou se connect 
router.post('/signup', userCtrl.signup);
router.post('/login, userCtrl.login');

///On exporte le "Router"
module.exports = router;