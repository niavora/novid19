const Test = require('../models/Test');
const {getSequence} = require("../controllers/sequenceController");

module.exports = {
    async insert(req, res) {
        try {
            req.body.IDTest = await getSequence('Test');
            let test = new Test(req.body);
            await test.save();
            return res.status(200).send('Insertion OK')
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async update(req, res) {
        try {
            await Test.findOneAndUpdate({IDTest: req.body.IDTest}, req.body).exec();
            return res.status(200).send("Modification ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async remove(req, res) {
        try {
            let id = req.params.IDTest;
            await Test.find({IDTest: id}).remove().exec();
            return res.status(200).send("suppression ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async getTest(req, res) {
        try {
            if(req.method == "POST"){
                let test = Test.find(req.body).exec();
                return res.status(200).send({test: test});
            }
            else if(req.method == 'GET') {
                let test;
                //Si l'url contient un ID
                if (req.params.IDTest) test = await Test.find({IDTest: req.params.IDTest}).exec();
                else test = await Test.find().exec();
                return res.status(200).send({test: test});
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },


};
