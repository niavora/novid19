const express = require('express');
const router = express.Router();
const {insert, update, remove, getHistorique} = require("../controllers/historiquePassageController");

module.exports = (io) => {

    router.post('/', insert);
    router.put('/', update);
    router.delete('/', remove);
    router.get('/', getHistorique);
    router.get('/:IDHistorique', getHistorique);
    router.post('/search/', getHistorique);

    return router;
}
