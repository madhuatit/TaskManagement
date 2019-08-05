const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {User} = require('../models/user');

router.get('/', (req, res) => {
    
    var queryVar = req.query;
    console.log('search value: ' + queryVar.searchKey);
    
    if(queryVar.searchKey){

        User.find({$or: [{First_Name : {$regex: queryVar.searchKey, $options: 'i'}}, {Last_Name: {$regex: queryVar.searchKey, $options: 'i'}}]}, function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while searching' + JSON.stringify(err, undefined, 2))
            }
        });

        
    }else if(queryVar.sortKey){

        User.find().sort([[queryVar.sortKey, 1]]).exec(function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while sorting' + JSON.stringify(err, undefined, 2))
            }
        });
    }else{
        console.log('inside user else part');
        User.find((err, docs) => {
            if(!err) {
                console.log(docs.length);
                res.send(docs);
            }else{
                console.log('Error in retrieving User Details' + JSON.stringify(err, undefined, 2));
            }
        });
       
    }
});

router.get('/:User_Id', (req, res) => {
    console.log(JSON.stringify(req.params.User_Id));
     if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No records for given user id: $(req.params.id)');
    }else{
        User.findById(req.params.id, (err, doc) => {
            if(!err) return res.send(doc);
            else console.log('Error in retrieving User' + JSON.stringify(err, undefined, 2));
        });
    } 
});

router.post('/', (req, res) => {
    var usr = new User({
        User_Id: req.body.User_Id,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Employee_Id: req.body.Employee_Id,
        Project_Id: req.body.Project_Id,
        Task_Id: req.body.Task_Id
    });
    console.log('Adding new User: ' + req.body.User_Id);
    usr.save((err, doc) =>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in saving User Details: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:User_Id', (req, res) => {
    console.log('Node controller: ' + JSON.stringify(req.params.User_Id));
      /* if(!ObjectId.isValid(req.params.User_Id)){
        console.log(req.params.User_Id);
        return res.status(400).send('No records with given Id found : $(req.params.User_Id)');
    }else{  */
        var usr = {
            User_Id: req.body.User_Id,
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Employee_Id: req.body.Employee_Id,
            Project_Id: req.body.Project_Id,
            Task_Id: req.body.Task_Id
        };
        User.findOneAndUpdate(req.params.User_Id, {$set: usr}, {new : true}, (err, doc) => {
            if(!err){
                res.send(doc);
            }else{
                console.log('Error in User Update: ' + JSON.stringify(err, undefined, 2));
            }
        });
    //}
});

router.delete('/:Employee_Id', (req, res) => {
    /* if(!ObjectId.isValid(req.params.User_Id)){
        return res.Status(400).send('No records with given id found: ' + $(req.params.Employee_Id));
    }else{ */
        /* User.findOneAndDelete(req.params.Employee_Id, (err, doc) => {
            if(!err){
                res.send(doc);
            }else{
                console.log('Error in User Delete: ' + JSON.stringify(err, undefined, 2));
            }
        }); */
        User.deleteOne({Employee_Id: req.params.Employee_Id}, function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('Error in User Delete: ' + JSON.stringify(err, undefined, 2));
            }
        })
   // }
});

module.exports = router;