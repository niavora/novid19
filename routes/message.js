const express = require('express');
const router = express.Router();
const {insert, update, remove, getMessage} = require("../controllers/messageController");

module.exports = (io) => {

    router.post('/', insert);
    router.put('/', update);
    router.delete('/', remove);
    router.get('/', getMessage);
    router.get('/:IDMessage', getMessage);
    router.post('/search/', getMessage);

    return router;
}
