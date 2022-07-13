const Sequence = require('../models/Sequence');
const Message = require("../models/Message");

module.exports = {
    async getSequence(model){
       let sequence = await Sequence.find({_id : model}).exec();
       await Sequence.findOneAndUpdate({_id: model}, {sequence_value : sequence[0].sequence_value + 1}).exec();
        return sequence[0].sequence_value;
    },

    async initSequence(req,res) {
        console.log("hey");
        let model = req.body.documents;
        let retour = [];
        for(let m of model) {
            let sequence = new Sequence({
                _id : m,
                sequence_value: 0
            });
            await sequence.save();
            await retour.push('Le document '+m+' a maintenant une séquence');
        }
        return res.status(200).send(retour);
    }
};



