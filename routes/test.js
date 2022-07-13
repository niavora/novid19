const express = require('express');
const {insert, update, remove, getTest} = require("../controllers/testController");
const router = express.Router();

module.exports = function() {

    router.post('/', insert);
    router.put('/', update);
    router.delete('/', remove);
    router.get('/', getTest);
    router.get('/:IDTest', getTest);
    router.post('/search/', getTest);

    return router;
}