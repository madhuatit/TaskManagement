const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

 var parentSchema = new mongoose.Schema({
    Parent_Id : {type: Number},
    Parent_Task: {type: String},
    Project_Id: {type: Number}
});

parentSchema
.virtual('Task', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'parent'
});

parentSchema.plugin(keyInc, {inc_field: 'Parent_Id'});

var Parent = mongoose.model('Parent', parentSchema); 

/* let Parent = new Schema({
    Parent_Id : {type: Number},
    Parent_Task: {type: String},
    Project_Id: {type: Number}
}, {collection: 'parent'});

Parent.plugin(keyInc, {inc_field: 'Parent_Id'}); */

module.exports = {Parent};