const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


var {Parent} = require('../models/parent');

router.get('/:Parent_Id', (req, res) => {
    console.log(JSON.stringify(req.params.Parent_Id));
     if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No records for given user id: $(req.params.id)');
    }else{
        Parent.findById(req.params.id, (err, doc) => {
            if(!err) return res.send(doc);
            else console.log('Error in retrieving User' + JSON.stringify(err, undefined, 2));
        });
    } 
});

router.get('/:_id', (req, res) => {
    console.log(JSON.stringify(req.params._id));
    if (!ObjectId.isValid(req.params._id)) {
        return res.sendStatus(400).send({ 'Success': false, 'message': 'Failed to retrieve User' });
    } else {
        Parent.findById(req.params._id, (err, doc) => {
            if (!err) {
                res.send(doc);
            }
            else {
                res.send(err);
            }
        });
    }
});

router.get('/', (req, res) => {
    
    var queryVar = req.query;
    console.log('search value: ' + queryVar._id);
    
    if(queryVar.searchKey){

        Parent.find({$or: [{Parent_Task : {$regex: queryVar.searchKey, $options: 'i'}}]}, function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while searching' + JSON.stringify(err, undefined, 2))
            }
        });

        
    }else if(queryVar._id){
        Parent.find({_id : req.params._id}, (err, doc) => {
            if(!err) return res.send(doc);
            else console.log('Error in retrieving parent' + JSON.stringify(err, undefined, 2));
        });
    }else{
        Parent.find((err, docs) => {
            if(!err) {
                res.send(docs);
            }else{
                console.log('Error in retrieving User Details' + JSON.stringify(err, undefined, 2));
            }
        });
       
    }
});

router.post('/', (req, res) => {
    var par = new Parent({
        Parent_Id : req.body.Parent_Id,
        Parent_Task : req.body.Parent_Task,
        Project_Id : req.body.Project_Id

    });
    console.log('inside parent post' + req.body.Parent_Id);
    par.save((err, doc) =>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in saving User Details: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;