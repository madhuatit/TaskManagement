const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;



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
User: {type : Schema.Types.ObjectId, ref: 'user'}
}, options);

projectSchema
.virtual('Task', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'Project'
});

projectSchema
.virtual('TotalTasks').get(function ()  {
  return this.get('Task') ? this.get('Task').length : 0;
});

projectSchema
.virtual('CompletedTasks').get( function() {
  if (this.get('Task') && this.get('Task').length > 0) {
    var tasks = this.get('Task').filter( (task) => {
      return task.Status == 1;
    });
    return tasks.length;
  }
  else {
    return 0;
  }
});

projectSchema.plugin(keyInc, {inc_field: 'Project_Id'});

var Project = mongoose.model('Project', projectSchema);

module.exports = {Project};
