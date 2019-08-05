const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
//const Task = require('./task');

var options = {
    toObjects :{ virtuals: false },
    toJSON :{ virtuals: true} 
}

var projectSchema = new mongoose.Schema({
Project_Id: {type : Number},
Project_Name: {type : String},
Start_Date: {type : Date},
End_Date: {type : Date},
Priority: {type : Number},
Manager_Id: {type : Number}
}, options);

/* projectSchema.virtual('Task', {
    ref : 'Task',
    localField: '_id',
    foreignField: 'Project'
}); */

/* projectSchema.virtual('Total_Tasks').get(function() {
    return this.get('Task')?this.get('Task').length: 0;
}); */

projectSchema.plugin(keyInc, {inc_field: 'Project_Id'});

var Project = mongoose.model('Project', projectSchema);

module.exports = {Project};
