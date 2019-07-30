const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

var parentTaskSchema = new mongoose.Schema({
    Parent_Id : {type: Number},
    Parent_Task: {type: String},
    Project_Id: {type: Number}
});

userSchema.plugin(keyInc, {inc_field: 'Parent_Id'});

var ParentTask = mongoose.model('ParentTask', parentTaskSchema);

module.exports = {ParentTask};