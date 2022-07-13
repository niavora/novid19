let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let schema = Schema({
    IDPersonne: Number,
    nom: String,
    prenom: String,
    mail: String,
    dateNaissance : Date,
    adresse : String,
    sexe : Number,
    cin : String
});

// Pour ajouter la pagination
schema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Personne', schema);