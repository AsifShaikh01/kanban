const express = require("express");
const {TaskModel} = require("../model/Task.model");
const taskRouter = express.Router();

taskRouter.get("/" , async (req,res)=>{
    try {
        const tasks = await TaskModel.find();
        res.send(tasks);
        
    } catch (error) {
        res.send(error)
    }
})

taskRouter.post("/add" , async (req,res)=>{
    const payload = req.body;
    try {
        const task = new TaskModel(payload);
        await task.save();

        res.send("task is added successfully!!");
        
    } catch (error) {
        res.send(error)
    }
})
taskRouter.patch("/:id" , async (req,res)=>{
    const payload = req.body;
    const ID = req.params.id;
    try {
        await TaskModel.findByIdAndUpdate({_id : ID} , payload);


        res.send("task is updated successfully!!");
        
    } catch (error) {
        res.send(error)
    }
})

taskRouter.delete("/:id" , async (req,res)=>{
    // const payload = req.body;
    const ID = req.params.id;
    try {
        await TaskModel.findByIdAndDelete({_id : ID});
        

        res.send("task is deleted successfully!!");
        
    } catch (error) {
        res.send(error)
    }
})


module.exports=  {
    taskRouter
}