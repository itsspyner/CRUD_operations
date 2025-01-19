const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const index = require('../routes/index.js');
const addData = require('../routes/addData.js');
const viewData = require('../routes/view.js');
const editData = require('../routes/edit.js');
const resume = require('../routes/resume.js');
const deleteData = require('../routes/delete.js')

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['POST', 'GET', 'PUT'],
    allowedHeaders: ['Content-Type']
}));

//Main data display route
app.use('/', index);
//Add information route
app.use('/', addData);
//View data route
app.use('/', viewData);
//Edit data route
app.use('/', editData);
//Delete data route
app.use('/', deleteData);
//Download resume route
app.use('/', resume);
app.listen(3000, () => {
    console.log('listening on port 3000');
})



