const express = require('express');
const router = express.Router();
const select = require('../database/queries.js');


router.get('/users', async (req, res) => {
    try {
        const data = await select.select();
        if (!data) return res.status(500).json({ error: 'No data in the database.' })
        else {
            return res.status(200).send(data);
        }

    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;