const express = require('express');
const router = express.Router();
const select = require('../database/queries.js');

router.post('/addData', async (req, res) => {
    const { personalInfo, education, workExperience, skills, brief_description } = req.body;
    const { name, email, phone, address } = personalInfo;

    const result = await select.selectWithEmail(email);
    if (result && result.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    const info = await select.insert(name, email, phone, brief_description, skills, education, workExperience, address);
    if (!info) return res.status(500).json({ error: 'Failed to add data' });
    else {
        console.log("Success");
        return res.status(201).json({ message: 'Successfully inserted' });
    }
});

module.exports = router;
