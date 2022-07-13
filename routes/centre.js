const express = require('express');
const router = express.Router();
const {insert, update, remove, getCentre} = require("../controllers/centreController");

module.exports = (io) => {

    router.post('/', insert);
    router.put('/', update);
    router.delete('/', remove);
    router.get('/', getCentre);
    router.get('/:IDCentre', getCentre);
    router.post('/search/', getCentre);

    return router;
}
