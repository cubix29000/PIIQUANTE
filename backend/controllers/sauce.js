///// On importe les Modèles de sauce via Models/sauce/********** */
const Sauce = require('../models/Sauce'); 
////On utilise un package pour va permettre de modifier et/ou supprimer des fichiers
const fs = require('fs'); 

//// création, modification, suppression et récupération sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;

//// un nouvel objet sauce est crée avec le model Sauce    
    const sauce = new Sauce({ 
        ...sauceObject,
//// l'url de l'image enregistrée dans le dossier images du serveur est aussi stockée dans la banque de données    
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,     
    });
 //// la sauce est sauvegardée dans la banque de données
    sauce.save()
    .then( () => res.status(201).json({ message: 'Sauce sauvegardée'}))
    .catch( error => res.status(400).json({ error }))
    console.log(sauce);
};

exports.modifySauce = (req, res, next) => {
///// on vérifie si la modification concerne le body ou un nouveau fichier image
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id} , {...sauceObject, _id: req.params.id})
    .then(()=> res.status(200).json({ message: 'Sauce modifiée'}))
    .catch(()=> res.status(400).json({ error}))
};
//// on identifie la sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}) 
    .then(sauce => {
//// on récupère l'adresse de l'image
    const filename = sauce.imageUrl.split('/images/')[1]; 
///// on la supprime du serveur
    fs.unlink(`images/${filename}`, () => { 
//// on supprime la sauce de la bdd
    Sauce.deleteOne({_id: req.params.id}) 
    .then(()=> res.status(200).json({ message: 'Sauce supprimée'}))
    .catch(error => res.status(400).json({ error}))
    });
})
};
//// on récupère toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then( sauces => res.status(200).json(sauces))
    .catch( error => res.status(400).json({ error }))
};
//// on récupère une seule sauce
exports.getOneSauce = (req, res, next) => {  
    Sauce.findOne({_id : req.params.id})
    .then( sauce => res.status(200).json(sauce))
    .catch( error => res.status(404).json({ error }))
};


////Partie ou l'utilisateur va pouvoir emettre un avis like et dislike
exports.likeSauce = (req, res, next) => {    
    const like = req.body.like;
///// On met en place le bouton LIKE
    if(like === 1) { 
        Sauce.updateOne({_id: req.params.id}, { $inc: { likes: 1}, $push: { usersLiked: req.body.userId}, _id: req.params.id })
        .then( () => res.status(200).json({ message: 'Vous aimez cette sauce' }))
        .catch( error => res.status(400).json({ error}))

    } else if(like === -1) { 
//// On met en place le bouton Dislike
        Sauce.updateOne({_id: req.params.id}, { $inc: { dislikes: 1}, $push: { usersDisliked: req.body.userId}, _id: req.params.id })
        .then( () => res.status(200).json({ message: 'Vous n’aimez pas cette sauce' }))
        .catch( error => res.status(400).json({ error}))

    } else {    
///// annulation du bouton j'aime ou alors je n'aime pas
        Sauce.findOne( {_id: req.params.id})
        .then( sauce => {
            if( sauce.usersLiked.indexOf(req.body.userId)!== -1){
                 Sauce.updateOne({_id: req.params.id}, { $inc: { likes: -1},$pull: { usersLiked: req.body.userId}, _id: req.params.id })
                .then( () => res.status(200).json({ message: 'Vous n’aimez plus cette sauce' }))
                .catch( error => res.status(400).json({ error}))
                }
                
            else if( sauce.usersDisliked.indexOf(req.body.userId)!== -1) {
                Sauce.updateOne( {_id: req.params.id}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId}, _id: req.params.id})
                .then( () => res.status(200).json({ message: 'Vous aimerez peut-être cette sauce à nouveau' }))
                .catch( error => res.status(400).json({ error}))
                }           
        })
        .catch( error => res.status(400).json({ error}))             
    }   
};