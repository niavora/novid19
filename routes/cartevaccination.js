const express = require('express');
const {insert, update, remove, getCarteVaccination} = require("../controllers/carteVaccinationController");
const router = express.Router();

module.exports = (io) => {

    router.post('/', insert);
    router.put('/', update);
    router.delete('/', remove);
    router.get('/', getCarteVaccination);
    router.post('/search/', getCarteVaccination);

    return router;
}