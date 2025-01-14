const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router = express.Router();
const select = require('../database/queries');

router.get('/download', async (req, res) => {
    const id = req.query.id;

    const result = await select.selectWithId(id)
    if (!result) {
        console.log("Error downloading pdf")
    }

    let fileName = `../resume/resume_${id}.pdf`;

    if (fs.existsSync(fileName)) {
        res.download(fileName, (err) => {
            if (err) throw err;
        })
        return;
    }

    const dataFile = fs.createWriteStream(fileName);

    const doc = new PDFDocument();
    doc.pipe(dataFile);

    doc.font('Helvetica-Bold').fontSize(18).text(result[0].name, { align: 'center' });
    doc.text(result[0].address, { align: 'center' });
    doc.text(`${result[0].phone} | ${result[0].email}`, { align: 'center' });
    doc.text('\n');

    doc.font('Helvetica-Bold').fontSize(14).text(
        `${result[0].brief_description}\n\n`,
        { align: 'center' }
    );
    const experience = result[0].experience;
    doc.font('Helvetica-Bold').fontSize(16).text('Professional Experience\n');

    doc.font('Helvetica-Bold').fontSize(14).text(experience.company + ' | ' + experience.position + ' | ' + experience.work_year);
    doc.text('Duties:' + " " + experience.duties);
    doc.text('\n');

    const education = result[0].education;
    doc.font('Helvetica-Bold').fontSize(16).text('\n' + 'Education' + '\n');
    doc.font('Helvetica-Bold').fontSize(14).text(education.school + ' | ' + education.year);
    doc.text('Level: ' + " " + education.level);
    doc.text('\n\n');


    doc.font('Helvetica-Bold').fontSize(16).text('Skills\n');
    doc.font('Helvetica-Bold').fontSize(14).text(result[0].skills);

    doc.end();

    dataFile.on('finish', () => {
        res.download(fileName, (err) => {
            if (err) throw err;
        })
    });
    dataFile.on('error', () => {
        console.log('Error');
    });

    console.log('PDF generated successfully');
});


module.exports = router;