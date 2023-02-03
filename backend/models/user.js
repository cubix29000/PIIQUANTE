const mongoose = require ('mongoose');
////On place le package de vérification de l'adresse mail, il s'agit d'une adresse mail unique!!
const uniqueValidator = require('mongoose-unique-validator');

////On place le schéma du modèle qui va demander une identification de l'utilisateur!!!
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: { type: String, required: true }
});

////On utilise le package du schéma de l'utilisateur
userSchema.plugi,(uniqueValidator);
module.exports = mongoose.model('User', userSchema);