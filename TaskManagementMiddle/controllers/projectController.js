const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Project} = require('../models/Project');

router.get('/', (req, res) => {
    Project.find((err, docs) => {
        if(!err){
            console.log(docs);
            res.send(docs);
        }else{
            console.log('Error in Retriving project details: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    var project = new Project({
        Project_Id: req.body.Project_Id,
        Project_Name: req.body.Project,
        Start_Date: req.body.Start_Date,
        End_Date: req.body.End_Date,
        Priority: req.body.Priority
    });
    project.save((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in saving project details: ' + JSON.stringify(err, undefined, 2));
        }
    });
})

module.exports = router;