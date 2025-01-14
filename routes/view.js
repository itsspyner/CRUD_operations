const express = require('express');
const router = express.Router();
const select = require('../database/queries');

router.get('/view/:id', async (req, res) => {
    const id = req.params.id;
    const data = await select.selectWithId(id);
    if (!data) return res.status(400).json({ error: 'Error occurred' });
    else {
        return res.status(200).send(data);
    }

});

module.exports = router;