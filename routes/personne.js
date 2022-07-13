const express = require('express');
const router = express.Router();
const {insert, update, remove, getPersonne} = require("../controllers/personneController");

module.exports = (io) => {

    router.post('/', insert);
    router.put('/', update);
    router.delete('/', remove);
    router.get('/', getPersonne);
    router.get('/:IDPersonne', getPersonne);
    router.post('/search/', getPersonne);

    return router;
}
