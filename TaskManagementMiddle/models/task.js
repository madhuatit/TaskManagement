const mongoose = require('mongoose');

var Task = mongoose.model('task', {
    Task_Id: {type : Number},
    Parent_Id: {type : Number},
    Project_Id: {type : Number},
    Task_Name: {type : String},
    Start_Date: {type : Date},
    End_Date: {type : Date},
    Priority: {type : Number},
    Status: {type : String}
});

module.exports = {Task};