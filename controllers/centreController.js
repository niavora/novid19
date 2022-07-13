const Centre = require('../models/Centre');
const {getSequence} = require('../controllers/sequenceController');

module.exports = {
    async insert(req, res) {
        try {
            req.body.IDCentre = await getSequence('Centre');
            let centre = new Centre(req.body);
            await centre.save();
            return res.status(200).send('Insertion OK')
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async update(req, res) {
        try {
            await Centre.findOneAndUpdate({IDCentre: req.body.IDCentre}, req.body).exec();
            return res.status(200).send("Modification ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async remove(req, res) {
        try {
            let id = req.params.IDCentre;
            await Centre.find({IDCentre: id}).remove().exec();
            return res.status(200).send("suppression ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async getCentre(req, res) {
        try {
            if(req.method == "POST"){
                let centre = Centre.find(req.body).exec();
                return res.status(200).send({centre: centre});
            }
            else if(req.method == 'GET') {
                let centre;
                //Si l'url contient un ID
                if (req.params.IDCentre) centre = await Centre.find({IDCentre: req.params.IDCentre}).exec();
                else centre = await Centre.find().exec();
                return res.status(200).send({centre: centre});
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },


};
