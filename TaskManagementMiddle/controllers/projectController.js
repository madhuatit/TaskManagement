const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Project} = require('../models/Project');

router.get('/', (req, res) => {

    var queryVar = req.query;
    console.log('search value: ' + queryVar.searchKey);

    if(queryVar.searchKey){

        Project.find({$or: [{Project_Name : {$regex: queryVar.searchKey, $options: 'i'}}]}, function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while searching' + JSON.stringify(err, undefined, 2))
            }
        });

        
    }else if(queryVar.sortKey){

        Project.find().sort([[queryVar.sortKey, 1]]).exec(function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while sorting' + JSON.stringify(err, undefined, 2))
            }
        });
    }else{
        Project.find((err, docs) => {
            if(!err){
                console.log(docs);
                res.send(docs);
            }else{
                console.log('Error in Retriving project details: ' + JSON.stringify(err, undefined, 2));
            }
        });
    }
});

router.post('/', (req, res) => {
    var project = new Project({
        Project_Id: req.body.Project_Id,
        Project_Name: req.body.Project,
        Start_Date: req.body.Start_Date,
        End_Date: req.body.End_Date,
        Priority: req.body.Priority,
        User: req.body.User
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