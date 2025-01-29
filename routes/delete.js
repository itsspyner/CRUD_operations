const express = require('express');
const router = express.Router();
const select = require('../database/queries');
const fs = require('fs');

router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const fileName = `resume_${id}.pdf`;

    if (fs.existsSync(fileName)) {
        fs.unlink(fileName, (err) => {
            if (err) throw err;
            else console.log("File deleted", fileName);
        });
    }
    const data = await select.deleteWithId(id);
    if (!data) return res.status(500).json({ error: 'Error deleting data' });
    else return res.status(204).json({ message: 'Data deleted successfully' });

});

module.exports = router;
