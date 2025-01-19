const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router = express.Router();
const select = require('../database/queries');

router.get('/download', async (req, res, next) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send('ID is required');
    }

    try {
        const result = await select.selectWithId(id);

        if (!result || result.length === 0) {
            return res.status(404).send('Data not found');
        }

        const fileName = `resume_${id}.pdf`;

        if (fs.existsSync(fileName)) {
            return res.download(fileName, (err) => {
                if (err) console.error(err);
            });
        }

        const doc = new PDFDocument();
        const dataFile = fs.createWriteStream(fileName);

        doc.pipe(dataFile);

        doc.font('Helvetica-Bold').fontSize(18).text(result[0].name, { align: 'center' });
        doc.text(result[0].address, { align: 'center' });
        doc.text(`${result[0].phone} | ${result[0].email}`, { align: 'center' });
        doc.text('\n');

        doc.font('Helvetica-Bold').fontSize(14).text(`${result[0].brief_description}\n\n`, { align: 'center' });

        doc.font('Helvetica-Bold').fontSize(16).text('Professional Experience\n');
        const experience = result[0].experience;
        doc.font('Helvetica').fontSize(14).text(`${experience.company} | ${experience.position} | ${experience.work_year}`);
        doc.text('Duties: ' + experience.duties);
        doc.text('\n');

        doc.font('Helvetica-Bold').fontSize(16).text('Education\n');
        const education = result[0].education;
        doc.font('Helvetica').fontSize(14).text(`${education.school} | ${education.year}`);
        doc.text('Level: ' + education.level);
        doc.text('\n\n');

        doc.font('Helvetica-Bold').fontSize(16).text('Skills\n');
        doc.font('Helvetica').fontSize(14).text(result[0].skills);

        doc.end();

        dataFile.on('finish', () => {
            res.download(fileName, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('PDF Downloaded successfully')
                }
            });
        });

        dataFile.on('error', (err) => {
            console.error('Error writing file:', err);
            res.status(500).send('Error generating PDF');
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
