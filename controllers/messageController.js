const Message = require('../models/Message');
const {getSequence} = require("../controllers/sequenceController");

module.exports = {
    async insert(req, res) {
        try {
            req.body.IDMessage = await getSequence('Message');
            let msg = new Message(req.body);
            await msg.save();
            return res.status(200).send('Insertion OK')
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async update(req, res) {
        try {
            await Message.findOneAndUpdate({IDMessage: req.body.IDMessage}, req.body).exec();
            return res.status(200).send("Modification ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async remove(req, res) {
        try {
            let id = req.params.IDMessage;
            await Message.find({IDMessage: id}).remove().exec();
            return res.status(200).send("suppression ok");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },

    async getMessage(req, res) {
        try {
            if(req.method == "POST"){
                let msg = Message.find(req.body).exec();
                return res.status(200).send({message: msg});
            }
            else if(req.method == 'GET') {
                let msg;
                //Si l'url contient un ID
                if (req.params.IDMessage) test = await Message.find({IDMessage: req.params.IDMessage}).exec();
                else msg = await Message.find().exec();
                return res.status(200).send({message: msg});
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    },


};
