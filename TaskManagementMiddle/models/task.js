const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

 var taskSchema = new mongoose.Schema({
    Task_Id: {type : Number},
    Parent: {type : Schema.Types.ObjectId, ref: 'parent'},
    Project: {type : Schema.Types.ObjectId, ref: 'project'},
    Task_Name: {type : String},
    Start_Date: {type : Date},
    End_Date: {type : Date},
    Priority: {type : Number},
    Status: {type : Number, default: 0},
    User: {type: Schema.Types.ObjectId, ref: 'user'}
});

taskSchema.plugin(keyInc, {inc_field: 'Task_Id'});

var Task = mongoose.model('Task', taskSchema);
module.exports = {Task};

/* let Task = new Schema({
    Task_Id: {type : Number},
    Parent: {type : Schema.Types.ObjectId, ref: 'parent'},
    Project: {type : Schema.Types.ObjectId, ref: 'project'},
    Task_Name: {type : String},
    Start_Date: {type : Date},
    End_Date: {type : Date},
    Priority: {type : Number},
    Status: {type : Number, default: 0},
    User: {type: Schema.Types.ObjectId, ref: 'user'}
}, {collection: 'Task'});

Task.plugin(keyInc, {inc_field: 'Task_Id'}); */


/* module.exports = mongoose.model('Task', Task); */