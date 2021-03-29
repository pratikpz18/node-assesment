const express = require('express');
const router = express.Router();

const Task = require('../models/taskmodel');

//Get

router.get("/tasks", async (req, res) => {
    const task = await Task.find({});
    try {
        res.render('tasks', { result:task })
    } catch (error) {
        res.status(500).send(error);
    }
});

//Create

router.post("/tasks", async (req, res) => {
    const task = req.body;
    const taskp = await new Task(task)
    try {
        await taskp.save();
        console.log(taskp)
        res.redirect('/task/tasks')
    } catch (error) {
        res.status(500).send(error);
    }
});

//Update

router.put('/tasks/:taskid', async (req,res) => {
    const taskid = req.params.taskid
    const task = req.body
    try{
        const updatetask = await Task.findByIdAndUpdate(taskid,task)
        updatetask.save()
        res.send(updatetask)

    }catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

//DElete

router.delete('/tasks/:taskid', async (req,res) => {
    const taskid = req.params.taskid
    try{
        const deltask = await Task.findByIdAndDelete(taskid)
        deltask.save()
        res.send("task deleted successfully");
    }catch(err){
        console.log(error)
        res.status(500).send(error);
    }
})



module.exports = router;