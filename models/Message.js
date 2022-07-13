let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let schema = Schema({
    IDMessage: Number,
    message: String,
    personneID: Number,
    centreID: Number,
    dateEnvoi : Date
});

// Pour ajouter la pagination
schema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Message', schema);