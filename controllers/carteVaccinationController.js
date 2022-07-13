const CarteVaccination = require('../models/CarteVaccination');

module.exports = {
    async insert(req, res) {
        try {
            let carteVaccination = new CarteVaccination(req.body);
            await carteVaccination.save();
            return res.status(200).send('Insertion OK')
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async update(req, res) {
        try {
            let update = {};
            let get = {};
            if(req.body.IDPersonneUpdate) update.IDPersonne = req.body.IDPersonneUpdate;
            if(req.body.IDCarteUpdate) update.IDCarte = req.body.IDCarteUpdate;
            if(req.body.IDCarte) get.IDCarte = req.body.IDCarte;
            if(req.body.IDPersonne) get.IDPersonne = req.body.IDPersonne;
            await CarteVaccination.updateMany(get, update);
            return res.status(200).send("Modification ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async remove(req, res) {
        try {
            let get = {};
            if(req.body.IDCarte) get.IDCarte = req.body.IDCarte;
            if(req.body.IDPersonne) get.IDPersonne = req.body.IDPersonne;
            await CarteVaccination.find(get).remove().exec();
            return res.status(200).send("suppression ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async getCarteVaccination(req, res) {
        try {
            if(req.method == 'GET') {
                let carteVaccincation = await CarteVaccination.find().exec();
                return res.status(200).send({carteVaccination: carteVaccincation});
            }
            else if(req.method == 'POST') {
                let get = {};
                if (req.body.IDCarte) get.IDCarte = req.body.IDCarte;
                if (req.body.IDPersonne) get.IDPersonne = req.body.IDPersonne;
                let carteVaccincation = await CarteVaccination.find(get).exec();
                return res.status(200).send({carteVaccination: carteVaccincation});
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },


};
