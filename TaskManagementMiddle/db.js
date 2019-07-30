const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TaskManagementDB', { useNewUrlParser: true }, (err) => {
    if(!err){
        console.log('MongoDB Connection Success.');
    }else{
        console.log('MongoDB Connection Error' + JSON.stringify(err, undefined, 2));
    }
});

mongoose.set('userCreateIndex', true);
module.exports = mongoose;