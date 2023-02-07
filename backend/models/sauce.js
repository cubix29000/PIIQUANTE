const mongoose = require('mongoose');

////On met en place le schema pour les sauces qui vont être demandées
////Il faut que dans le schéma apparaisse name, le piquant de la sauce, si les utilisateurs ont aimés
////le fabriquant etc.............

const sauceSchema = mongoose.Schema({ 

    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: {type: String },
    heat: { type: Number },
    likes: { type: Number, default: 0}, 
    dislikes: { type: Number, default: 0},
    userId: { type: String}, 
    usersLiked: [String],
    usersDisliked: [String],

});

module.exports = mogoose.model('Sauce', sauceSchema);