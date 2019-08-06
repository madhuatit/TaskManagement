const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

var projectSchema = new mongoose.Schema({
Project_Id: {type : Number},
Project_Name: {type : String},
Start_Date: {type : Date},
End_Date: {type : Date},
Priority: {type : Number},
User: {type : Schema.Types.ObjectId, ref: 'user'}
});

projectSchema.plugin(keyInc, {inc_field: 'Project_Id'});

var Project = mongoose.model('Project', projectSchema);

module.exports = {Project};
