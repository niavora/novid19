const Lieu = require('../models/Lieu');
const {getSequence} = require("../controllers/sequenceController");

module.exports = {
    async insert(req, res) {
        try {
            req.body.IDLieu = await getSequence('Lieu');
            let lieu = new Lieu(req.body);
            await lieu.save();
            return res.status(200).send('Insertion OK')
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async update(req, res) {
        try {
            await Lieu.findOneAndUpdate({IDLieu: req.body.IDLieu}, req.body).exec();
            return res.status(200).send("Modification ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async remove(req, res) {
        try {
            let id = req.params.IDLieu;
            await Lieu.find({IDLieu: id}).remove().exec();
            return res.status(200).send("suppression ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async getLieu(req, res) {
        try {
            if(req.method == "POST"){
                let lieu = Lieu.find(req.body).exec();
                return res.status(200).send({lieu: lieu});
            }
            else if(req.method == 'GET') {
                let lieu;
                //Si l'url contient un ID
                if (req.params.IDLieu) lieu = await Lieu.find({IDLieu: req.params.IDLieu}).exec();
                else lieu = await Lieu.find().exec();
                return res.status(200).send({lieu: lieu});
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },


};
