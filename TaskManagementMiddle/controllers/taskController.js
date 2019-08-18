const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Task} = require('../models/Task');
var {Parent} = require('../models/parent');

router.get('/:proj', (req, res) => {
    console.log('get project task method called');
    if(!ObjectId.isValid(req.params.Project)){
        return res.Status(400).send('No records with given Id found :' + $(req.params.Project));
    }
    console.log('requested value: ' + req.params.Project);
    Task.findById(req.params.Project, (err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in Retriving Employee: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.get('/', (req, res) => {
    var queryVar = req.query;
    console.log('Madhu'+JSON.stringify(queryVar.Project));
    if(queryVar.sortKey){

        Task.find().sort([[queryVar.sortKey, 1]]).exec(function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while sorting' + JSON.stringify(err, undefined, 2))
            }
        });
    }else if(queryVar.Project){
        Task.find({Project : queryVar.Project}, (err, doc) => {
            if(!err){
                res.send(doc);
            }else{
                console.log('Error in Retriving Employee: ' + JSON.stringify(err, undefined, 2));
            }
        });
    }else{
          Task.find((err, docs) => {
            if(!err){
                console.log(docs);
                res.send(docs);
            }else{
                console.log('Error in Retriving task details: ' + JSON.stringify(err, undefined, 2));
            }
        });      
        /* var Query = Task.find();
        Query.exec(function(err, docs){
            res.send(docs);
        }) ; */

    }
    
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.Status(400).send('No records with given Id found :' + $(req.params.id));
    }

    Task.findById(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in Retriving Employee: ' + JSON.stringify(err, undefined, 2));
        }
    })
})



router.put('/:Task_Id', (req, res) => {
    
    let taskId = req.params.Task_Id;
        Task.findOne({Task_Id: taskId}, (err, taskData) =>{
            if(err){
                console.log(err);
            }else{
                if(taskData){
                    
                    taskData.Parent= req.body.Parent,
                    taskData.Project= req.body.Project,
                    taskData.Task_Name= req.body.Task_Name,
                    taskData.Start_Date= req.body.Start_Date,
                    taskData.End_Date= req.body.End_Date,
                    taskData.Priority= req.body.Priority,
                    taskData.Status= req.body.Status,
                    taskData.User= req.body.User

                    taskData.save((err, taskData) => {
                        if(err){
                            console.log('update task faile');
                        }else{
                            console.log('updated task failed');
                           // res.send(taskData);
                        }
                    });
                }
            }
        });
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.Status(400).send('No records with given id found: ' + $(req.params.id));
    }else{
        Task.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.send(doc);
            }else{
                console.log('Error in Task Delete: ' + JSON.stringify(err, undefined, 2));
            }
        })
    }
})

router.post('/', (req, res) => {
    let taskData = req.body;
    let task = new Task(taskData);
    task.save((err, taskData) => {
        if(!err){
            res.send(taskData);
        }
    })
    /* var task = new Task({
        Task_Id: req.body.Task_Id,
        Parent: req.body.Parent,
        Project: req.body.Project,
        Task_Name: req.body.Task_Name,
        Start_Date: req.body.Start_Date,
        End_Date: req.body.End_Date,
        Priority: req.body.Priority,
        Status: req.body.Status,
        User: req.body.User
    });
    task.save((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in saving task details: ' + JSON.stringify(err, undefined, 2));
        }
    }); */
});

module.exports = router;
