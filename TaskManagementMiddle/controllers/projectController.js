const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Project} = require('../models/Project');

router.get('/', (req, res) => {

    var queryVar = req.query;
    

    if(queryVar.searchKey){

        Project.find({$or: [{Project_Name : {$regex: queryVar.searchKey, $options: 'i'}}]}, function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                res.status(400).send({"Message": "Project Search Failed"});
            }
        });

        
    }else if(queryVar.sortKey){

        Project.find().populate('Task', ['Task_Id', 'Status']).sort([[queryVar.sortKey, 1]]).exec(function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while sorting' + JSON.stringify(err, undefined, 2))
            }
        });
    }else{
        
         Project.find((err, docs) => {
            if(!err){
                res.send(docs);
            }else{
                console.log('Error in Retriving project details: ' + JSON.stringify(err, undefined, 2));
            }
        }).populate('Task', ['Task_Id', 'Status']); 

      
    }
});

router.post('/', (req, res) => {
    var project = new Project({
        Project_Id: req.body.Project_Id,
        Project_Name: req.body.Project_Name,
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
});

router.post('/edit/:Project_Id', (req, res) => {
        let projId = req.params.Project_Id;
        Project.findOne({Project_Id: projId}, (err, projData) =>{
            if(err){

            }else{
                if(projData){
                    projData.Project_Name = req.body.Project_Name;
                    projData.Start_Date = req.body.Start_Date;
                    projData.End_Date = req.body.End_Date;
                    projData.Priority = req.body.Priority;
                    projData.User = req.body.User;

                    projData.save((err, projData) => {
                        if(err){

                        }else{
                            res.send(projData);
                        }
                    });
                }
            }
        });
        
    //}
});

router.get('/:Project_Id', (req, res) => {
        Project.deleteOne({Project_Id: req.params.Project_Id}, function(err, docs) {
            if(!err){
                console.log('inside delete');
                res.send(docs);
                //res.status(400).send({"Message": "Project Search Failed"});
            }else{
                res.status(400).send({"Message": "Project Search Failed"});
            }
        })   
});

module.exports = router;