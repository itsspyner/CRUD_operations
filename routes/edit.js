const express = require('express');
const router = express.Router();
const select = require('../database/queries');

router.put('/edit/:id', async (req, res, next) => {
    const id = req.params.id;
    const { personalInfo, education, workExperience, skills, brief_description } = req.body;
    const { name, address, phone, email } = personalInfo;

    const info = await select.update(name, email, phone, brief_description, skills, education, workExperience, address, id,);
    if (!info) return res.status(500).json({ error: 'error updating data' })
    else {
        return res.status(200).send(info);
    }
});

module.exports = router;
