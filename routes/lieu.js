const express = require('express');
const router = express.Router();
const {insert, update, remove, getLieu} = require("../controllers/lieuController");

module.exports = (io) => {

    router.post('/', insert);
    router.put('/', update);
    router.delete('/', remove);
    router.get('/', getLieu);
    router.get('/:IDLieu', getLieu);
    router.post('/search/', getLieu);

    return router;
}
