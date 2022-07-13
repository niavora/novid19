const Vaccin = require('../models/Vaccin');
const {getSequence} = require("../controllers/sequenceController");

module.exports = {
    async insert(req, res) {
        try {
            req.body.IDVaccin = await getSequence('Vaccin');
            let vaccin = new Vaccin(req.body);
            await vaccin.save();
            return res.status(200).send('Insertion OK')
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async update(req, res) {
        try {
            await Vaccin.findOneAndUpdate({IDVaccin: req.body.IDVaccin}, req.body).exec();
            return res.status(200).send("Modification ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async remove(req, res) {
        try {
            let id = req.params.IDVaccin;
            await Vaccin.find({IDVaccin: id}).remove().exec();
            return res.status(200).send("suppression ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async getVaccin(req, res) {
        try {
            if(req.method == "POST"){
                let vaccin = Vaccin.find(req.body).exec();
                return res.status(200).send({vaccin: vaccin});
            }
            else if(req.method == 'GET') {
                let vaccin;
                //Si l'url contient un ID
                if (req.params.IDVaccin) vaccin = await Vaccin.find({IDVaccin: req.params.IDVaccin}).exec();
                else vaccin = await Vaccin.find().exec();
                return res.status(200).send({vaccin: vaccin});
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },


};
