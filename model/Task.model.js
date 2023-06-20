const mongoose = require("mongoose");


const taskSchema = mongoose.Schema({
  title : String,
  description : String,
  status : Boolean
  
})

const TaskModel = mongoose.model("task" , taskSchema);

module.exports = {
  TaskModel
}