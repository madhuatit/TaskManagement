const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Task} = require('../models/Task');
var {Parent} = require('../models/parent');
const parent = require('../models/parent');

router.get('/:proj', (req, res) => {
    
    if(!ObjectId.isValid(req.params.Project)){
        return res.Status(400).send('No records with given Id found :' + $(req.params.Project));
    }
    
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
        var query = Task.find();
        query.populate('parent');
        
        query.exec(function(err, docs) {
            if(!err){
                
                    res.send(docs);
            }else{
                console.log('Error in Retriving Task: ' + JSON.stringify(err, undefined, 2));
            }
        });
         

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
            console.log('Error in Retriving Task: ' + JSON.stringify(err, undefined, 2));
        }
    })
})



router.put('/:Task_Id', (req, res) => {
    
    let taskId = req.params.Task_Id;
        Task.findOne({Task_Id: taskId}, (err, taskData) =>{
            if(err){
                console.log('Error in Putting Task: ' + JSON.stringify(err, undefined, 2));
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
                            console.log('Error in saving Task: ' + JSON.stringify(err, undefined, 2));
                        }else{
                            
                            res.send(taskData);
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
    
});

module.exports = router;
