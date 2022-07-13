const express = require('express');
const router = express.Router();
const {insert, update, remove, getVaccin} = require("../controllers/vaccinController");

module.exports = (io) => {

    router.post('/', insert);
    router.put('/', update);
    router.delete('/', remove);
    router.get('/', getVaccin);
    router.get('/:IDVaccin', getVaccin);
    router.post('/search/', getVaccin);

    return router;
}
