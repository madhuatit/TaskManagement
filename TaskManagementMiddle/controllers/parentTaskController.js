const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var ParentTask = require('../models/parentTask');

router.post('/', (req, res) => {
    var parentTask = new ParentTask({
        Parent_Id: req.body.Parent_Id,
        Parent_Task: req.body.Parent_Task,
        Project_Id: req.body.Project_Id
    });
    console.log('Adding new User: ' + req.body.Parent_Id);
    parentTask.save((err, doc) =>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in saving Parent Task Details: ' + JSON.stringify(err, undefined, 2));
        }
    });
});