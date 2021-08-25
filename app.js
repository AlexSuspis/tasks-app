const express = require('express');
const app = express();
const path = require('path');
const quickSortTasks = require('./helper.js');

const mongoose = require('mongoose');
const Task = require('./models/task');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))
app.use(express.static('images'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const dbUrl = 'mongodb://localhost:27017/tasks-app';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err));


app.get('/tasks', async (req, res) => {
    const unorderedTasks = await Task.find({});
    const tasks = quickSortTasks(unorderedTasks);
    res.render('tasks/index', { tasks })
})

app.post('/task', async (req, res) => {
    const { text, position } = req.body;
    const t = new Task({
        text,
        position
    });
    t.save();
    res.send(t._id);
});

app.patch('/task/:id/text', async (req, res) => {
    let { id } = req.params;
    const { newText } = req.body;
    const task = await Task.findByIdAndUpdate(id, { text: newText });
    await task.save();
})

app.patch('/task/:id/colour', (req, res) => {
    console.log('task colour change patch route');
})

app.patch('/task/:id/label', (req, res) => {
    console.log('task label change patch route');
})

app.patch('/task/:id/position', async (req, res) => {
    //for when only a reodering occurs. No promotion or demotion of tasks.
    //A task stays a task and a subtask stays a subtask.

    const { id } = req.params;
    const { newPosition } = req.body;
    const t = await Task.findById(id);

    t.position = newPosition;
    await t.save();
    res.send(t);
})

app.patch('/task/:id/promote', (req, res) => {
    //we take a subtask and make it a main task
    //task 1 is the subtask being promoted
    //take id of task 1 from req.params, and id from task 2 from req.body
    //we remove task 2's id from task 1's parentTask property 
    //we remove task 1's id from task 2's subtask array
    //we set task 1's position from newPosition in req.body (it is now placed in array of main tasks)
    //we save both tasks 
    const { newPosition } = req.body;
    console.log(`PROMOTE: New position is ${newPosition}`);
})

app.patch('/task/:id/demote', (req, res) => {
    //take a given task 1, and make it a subtask of another task 2
    //take id of task one from params, and id of task 2 from req.body
    //add task 1 id to task 2's subtasks array
    //add task 2's id to parentTask property of task 1
    //update task 1's position. include new position in req.body
    //save both tasks
    const { newPosition } = req.body;
    console.log(`DEMOTE: New position is ${newPosition}`);
})

// DELETE a task
app.delete('/task/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Task.findOneAndDelete({ _id: id });
    res.send(data);
})

module.exports = app;