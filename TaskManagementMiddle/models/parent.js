const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

var parentSchema = new mongoose.Schema({
    Parent_Id : {type: Number},
    Parent_Task: {type: String},
    Project_Id: {type: Number}
});

parentSchema.plugin(keyInc, {inc_field: 'Parent_Id'});

var Parent = mongoose.model('Parent', parentSchema);

module.exports = {Parent};