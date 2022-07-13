let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let schema = Schema({
    IDCentre: Number,
    nomCentre: String,
    adresseCentre: String,
    coordonneeCentre : String
});

// Pour ajouter la pagination
schema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Centre', schema);