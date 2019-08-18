const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');

router.get('/', (req, res) => {

    var queryVar = req.query;

    if (queryVar.searchKey) {

        User.find({ $or: [{ First_Name: { $regex: queryVar.searchKey, $options: 'i' } }, { Last_Name: { $regex: queryVar.searchKey, $options: 'i' } }] }, function (err, docs) {
            if (!err) {
                res.send({ 'Success': true, 'Data': docs });
            }
            else {
                res.send({ 'Success': false, 'message': 'Failed to retrieve User' });
            }
        });


    } else if (queryVar.sortKey) {

        User.find().sort([[queryVar.sortKey, 1]]).exec(function (err, docs) {
            if (!err) {
                res.send({ 'Success': true, 'Data': docs });
            }
            else {
                res.send({ 'Success': false, 'message': 'Failed to retrieve User' });
            }
        });
    } else {
        console.log('inside user else part');
        User.find((err, docs) => {
            if (!err) {
                res.send({ 'Success': true, 'Data': docs });
            }
            else {
                res.send({ 'Success': false, 'message': 'Failed to retrieve User' });
            }
        });

    }
});

router.get('/:User_Id', (req, res) => {
    console.log(JSON.stringify(req.params.User_Id));
    if (!ObjectId.isValid(req.params.id)) {
        return res.sendStatus(400).send({ 'Success': false, 'message': 'Failed to retrieve User' });
    } else {
        User.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.send({ 'Success': true, 'Data': doc });
            }
            else {
                res.send({ 'Success': false, 'message': 'Failed to retrieve User' });
            }
        });
    }
});

router.get('/:_id', (req, res) => {
    console.log(JSON.stringify(req.params._id));
    if (!ObjectId.isValid(req.params._id)) {
        return res.sendStatus(400).send({ 'Success': false, 'message': 'Failed to retrieve User' });
    } else {
        User.findById(req.params._id, (err, doc) => {
            if (!err) {
                res.send({ 'Success': true, 'Data': doc });
            }
            else {
                res.send({ 'Success': false, 'message': 'Failed to retrieve User' });
            }
        });
    }
});

router.post('/add', (req, res) => {
    console.log('inside router add');
    var usr = new User({
        User_Id: req.body.User_Id,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Employee_Id: req.body.Employee_Id,
        Project_Id: req.body.Project_Id,
        Task_Id: req.body.Task_Id
    });

    usr.save((err, doc) => {
        if (!err) {
            res.send({ 'Success': true, 'Data': doc });
        } else {
            res.send({ 'Success': false, 'message': 'Failed to add User' });
        }
    });
});

router.post('/edit/:User_Id', (req, res) => {

    console.log('inside router edit');
    var usr = {
        User_Id: req.body.User_Id,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Employee_Id: req.body.Employee_Id,
        Project_Id: req.body.Project_Id,
        Task_Id: req.body.Task_Id
    };
    User.findOneAndUpdate(req.params.User_Id, { $set: usr }, { new: true }, (err, doc) => {
        if (!err) {
            res.send({ 'Success': true, 'Data': doc });
        } else {
            res.send({ 'Success': false, 'message': 'Failed to update User' });
        }
    });

});

router.get('/delete/:Employee_Id', (req, res) => {

    User.deleteOne({ Employee_Id: req.params.Employee_Id }, function (err, docs) {
        if (!err) {
            res.send({ 'Success': true, 'Data': docs });
        } else {
            res.send({ 'Success': false, 'message': 'Failed to delete User' });
        }
    })

});

module.exports = router;