const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Task} = require('../models/Task');

router.get('/', (req, res) => {
    Task.find((err, docs) => {
        if(!err){
            console.log(docs);
            res.send(docs);
        }else{
            console.log('Error in Retriving task details: ' + JSON.stringify(err, undefined, 2));
        }
    });
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

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.Status(400).send('No records with given Id found :' + $(req.params.id));
    }else{
        var task = {
            Task_Id: req.body.Task_Id,
            Parent_Id: req.body.Parent_Id,
            Project_Id: req.body.Project_Id,
            Task_Name: req.body.Task_Name,
            Start_Date: req.body.Start_Date,
            End_Date: req.body.End_Date,
            Priority: req.body.Priority,
            Status: req.body.Status
        };
        Task.findByIdAndUpdate(req.params.id, {$set: task}, {new : true}, (err, doc) => {
            if(!err){
                res.send(doc);
            }else{
                console.log('Error in Task Update: ' + JSON.stringify(err, undefined, 2));
            }
        });
    }
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
    var task = new Task({
        Task_Id: req.body.Task_Id,
        Parent_Id: req.body.Parent_Id,
        Project_Id: req.body.Project_Id,
        Task_Name: req.body.Task_Name,
        Start_Date: req.body.Start_Date,
        End_Date: req.body.End_Date,
        Priority: req.body.Priority,
        Status: req.body.Status
    });
    task.save((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in saving task details: ' + JSON.stringify(err, undefined, 2));
        }
    });
})

module.exports = router;
