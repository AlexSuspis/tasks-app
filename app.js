const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
// const { tasks } = require('./seeds/mock_data');
const mongoose = require('mongoose');
const quickSortTasks = require('./helper.js');

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

// GET all tasks
app.get('/tasks', async (req, res) => {
    const unorderedTasks = await Task.find({});

    //order tasks based on their position
    // console.log(tasks);
    const tasks = quickSortTasks(unorderedTasks);
    // console.log(taks);

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

    const task = Task.findById({ id });
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

    //take new position from req.body
    //fetch task by id
    //update position property
    //we take old position, new position, and we must adjust every other position for 
    //affected tasks. Basically perform a shift operation
    //save task
    const { id } = req.params;
    const t = await Task.findById(id);
    const { newPosition } = req.body;

    t.position = newPosition;
    await t.save();
    res.send(t);
    // console.log(`New position is ${newPosition}`);
})

app.patch('/task/:id/promote', (req, res) => {
    //take id of task 1 from req.params, and id from task 2 from req.body
    //task 1 is being promoted
    //we remove task 2's id from task 1's parentTask property 
    //we remove task 1's id from task 2's subtask array
    //we update task 1's position which is in req.body
    //we take old position, new position, and we must adjust every other position for 
    //affected tasks.
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

    //we must update all preceding task's positions. This can be done on the client side.

    res.send(data);
})

const port = 3000;
app.listen(port, () => {
    console.log("Listening on port " + port + "; press ctrl-c to exit")
})






//PATCH endpoint for changing the following task properties: subtasks array, colour, labels array, inner text
// app.patch('/tasks/:id', (req, res) => {
//     let { id } = req.params;
//     let [newProperty, newValue] = Object.entries(req.body)[0];

//     //find task with unique id
//     let task = tasks.find(t => t.id === parseInt(id));

//     //find task's property that's equal to key of req.body object, if any exists.
//     //if found, replace its value with value from req.body object.
//     for (let property in task) {
//         if (newProperty == property) {
//             task[property] = newValue;
//         }
//     }
//     console.dir(tasks[0])
//     res.send('patch req received!');
// })