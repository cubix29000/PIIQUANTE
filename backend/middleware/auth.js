///////////// TOKEN authentification utilisateur 
const jwt = require('jsonwebtoken');

/////étape de l'authentification de l'utilisateur et réponse
module.exports = (req, res, next) => {
    try {
/////Pour la requête entrante on procède à la récupération du TOKEN
        const token = req.headers.authorization.split(' ')[1];
/////On procède à la vérification 
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
////Suite à la validation du Token on récupère l'ID du TOKEN 
        const userId = decodedToken.userId;
////Il faut mettre en relation le UserID à l'origine de la requête à celui du Token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Unvalid User Id';
        } else {
            next();
        }
    } catch(error){
        res.status(401).json({ error: new Error('Requête non authentifié !!!')});
    }
};