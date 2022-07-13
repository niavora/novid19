const express = require('express');
const router = express.Router();

module.exports = function (io) {
    const test = require('./test')(io);
    const personne = require('./personne')(io);
    const centre = require('./centre')(io);
    const cartevaccination = require('./cartevaccination')(io);
    const historiquepassage = require('./historiquepassage')(io);
    const lieu = require('./lieu')(io);
    const message = require('./message')(io);
    const vaccin = require('./vaccin')(io);
    const sequence = require('./sequence')(io);

    router.use('/test', test);
    router.use('/personne', personne);
    router.use('/centre', centre);
    router.use('/cartevaccination', cartevaccination);
    router.use('/historiquepassage', historiquepassage);
    router.use('/lieu', lieu);
    router.use('/message', message);
    router.use('/vaccin', vaccin);
    router.use('/sequence', sequence);

    console.log("ROUTE io")

    return router;
};
