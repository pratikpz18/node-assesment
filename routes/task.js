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
router.get('/edit/:taskid',async (req,res) => {
    const taskid = req.params.taskid
    try {
        const task = await Task.find({});
        console.log(task,taskid)
        // res.send(task)
        res.render('edit',{ result:task,taskid:taskid})
        // res.render('tasksedit',{ result:task,taskid:taskid})
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/edit/:taskid', async (req,res) => {
    const taskid = req.params.taskid
    const task = req.body
    try{
        const updatetask = await Task.findByIdAndUpdate(taskid,task)
        updatetask.save()
        res.redirect('/task/tasks');
    }catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

// router.put('/edit/:taskid', async (req,res) => {
//     const taskid = req.params.taskid
//     const task = req.body
//     try{
//         const updatetask = await Task.findByIdAndUpdate(taskid,task)
//         updatetask.save()
//         res.redirect('/task/tasks');
//     }catch (error) {
//         console.log(error)
//         res.status(500).send(error);
//     }
// })

//DElete

router.get('/tasks/:taskid', async (req,res) => {
    console.log("del")
    const taskid = req.params.taskid
    try{
        const deltask = await Task.findByIdAndDelete(taskid)
        deltask.save()
        res.redirect('/task/tasks')
    }catch(err){
        console.log(error)
        res.status(500).send(error);
    }
})

// router.delete('/tasks/:taskid', async (req,res) => {
//     console.log("del")
//     const taskid = req.params.taskid
//     try{
//         const deltask = await Task.findByIdAndDelete(taskid)
//         deltask.save()
//         res.redirect('/task/tasks')
//     }catch(err){
//         console.log(error)
//         res.status(500).send(error);
//     }
// })



module.exports = router;