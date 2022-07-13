const Personne = require('../models/Personne');
const {getSequence} = require("../controllers/sequenceController");

module.exports = {
    async insert(req, res) {
        try {
            req.body.IDPersonne = await getSequence('Personne');
            let personne = new Personne(req.body);
            await personne.save();
            return res.status(200).send('Insertion OK')
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async update(req, res) {
        try {
            await Personne.findOneAndUpdate({IDPersonne: req.body.IDPersonne}, req.body).exec();
            return res.status(200).send("Modification ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async remove(req, res) {
        try {
            let id = req.params.IDPersonne;
            await Personne.find({IDPersonne: id}).remove().exec();
            return res.status(200).send("suppression ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async getPersonne(req, res) {
        try {
            if(req.method == "POST"){
                let personne = Personne.find(req.body).exec();
                return res.status(200).send({personne: personne});
            }
            else if(req.method == 'GET') {
                let personne;
                //Si l'url contient un ID
                if (req.params.IDPersonne) personne = await Personne.find({IDPersonne: req.params.IDPersonne}).exec();
                else personne = await Personne.find().exec();
                return res.status(200).send({personne: personne});
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },


};
