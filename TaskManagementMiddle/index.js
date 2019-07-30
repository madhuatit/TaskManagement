const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {mongoose} = require('./db.js');

var app = express();


var taskController = require('./controllers/taskController.js');
var projectController = require('./controllers/projectController.js');
var userController = require('./controllers/userController.js');

app.use(bodyParser.json());
app.use(cors({ origin : 'http://localhost:4200'}));
app.listen(3000, () => console.log('Server started at port: 3000'));

app.use('/task', taskController);
app.use('/project', projectController);
app.use('/user', userController);

