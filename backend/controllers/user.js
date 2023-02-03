////On utilise la fonction de hachage Bcrypt 
const bcrypt = require('bcrypt');
////On se demande une identification par l'utilisateur
const User = require('./models/user');
////On procède à une identification par TOKEN
const jwt = require('jsonwebtoken');
////On incorpore le package de validateur d'email
const emailValidator = require('password-validator');
////On incorpore le package de validator de mot de passe(password)
const  passwordValidator = require('password-validator'); 

const passwordSchema = new passwordValidator();

/////On définit les caractères autorisés dans le mot de passe dans le password schéma.
passwordSchema
////On définit le nombre de caratère minimum
.is().min(8)
////On définit la longueur maximum de caratère 
.is().max(50)
////Le mot de passe doit avoir une majuscule 
.has().uppercase()
////Le mot de masse doit contenir des lettres mininuscule
.has().lowercase()
////le mot de passe doit contenir au moins un caractère spécial
.has().digits()
////pas de de symbole
.has().not().symbols();

////1ere connexion et inscription de l'utilisateur 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                //////partie de la création d un nouvel utilisateur avec l'adresse mail
                email: req.body.email,
                //////hashage du mot de passe
                password: hash
            });
            //////stockage de Mongoose dans la base de donnée
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé'}))
                .catch(error => res.status(400).json({ Erreur}));
        })
        .catch(erro => res.status(500).json({ Erreur }));
};

////Connexion d'un utilisateur déjà créé (USER)
exports.login = (req, res, next) => {
    /////Authentification d l'utilisateur, s'il figure bien dans la base de donnée
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ erreur: 'Utilisateur non trouvé !'})
            }
            ////On compare la corélation du mot de passe utilisateur avec Bcrypt.compare
            bcrypt.compare(req.body.password, user.password) 
                .then(valid => {
                    if (!valid){
                        return res.status(401).json({ Error:' Identifiant ou mot de passe incorrect !'});
                    }
            ////Une fois l'identification réussi on génère un token
                    res.status(200).json({
                        userId: user_id,
                        token: jwt.sign(
                            { userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error })); 
        })
        .catch(error => res.status(500).json({ error }));
};
