const express = require('express');
const router = express.Router();
const {initSequence} = require("../controllers/sequenceController");

module.exports = function(io) {

    console.log("SEQUENCE")
    router.post('/init', initSequence);

    return router;
}