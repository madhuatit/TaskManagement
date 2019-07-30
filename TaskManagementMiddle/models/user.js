const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


/* var User = mongoose.model('user', {
    User_Id : {type: Number},
    First_Name: {type: String},
    Last_Name: {type: String},
    Employee_Id: {type: Number},
    Project_Id: {type: Number},
    Task_Id: {type: Number}
});

    
module.exports = {User}; */

var userSchema = new mongoose.Schema({
    User_Id : {type: Number},
    First_Name: {type: String},
    Last_Name: {type: String},
    Employee_Id: {type: Number},
    Project_Id: {type: Number},
    Task_Id: {type: Number}
});

userSchema.plugin(keyInc, {inc_field: 'User_Id'});

var User = mongoose.model('User', userSchema);

module.exports = {User};