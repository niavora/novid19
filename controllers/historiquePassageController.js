const HistoriquePassage = require('../models/HistoriquePassage');
const {getSequence} = require("../controllers/sequenceController");

module.exports = {
    async insert(req, res) {
        try {
            req.body.IDHistorique = await getSequence('HistoriquePassage');
            let historiquePassage = new HistoriquePassage(req.body);
            await historiquePassage.save();
            return res.status(200).send('Insertion OK')
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async update(req, res) {
        try {
            await HistoriquePassage.findOneAndUpdate({IDHistorique: req.body.IDHistorique}, req.body).exec();
            return res.status(200).send("Modification ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async remove(req, res) {
        try {
            let id = req.params.IDHistorique;
            await HistoriquePassage.find({IDHistorique: id}).remove().exec();
            return res.status(200).send("suppression ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async getHistorique(req, res) {
        try {
            if(req.method == "POST"){
                let historique = HistoriquePassage.find(req.body).exec();
                return res.status(200).send({historique: historique});
            }
            else if(req.method == 'GET') {
                let historique;
                //Si l'url contient un ID
                if (req.params.IDHistorique) historique = await HistoriquePassage.find({IDHistorique: req.params.IDHistorique}).exec();
                else historique = await HistoriquePassage.find().exec();
                return res.status(200).send({historique: historique});
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },


};
