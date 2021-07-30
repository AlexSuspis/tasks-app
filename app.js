const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const { tasks } = require('./seeds/mock_data');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))
app.use(express.static('images'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// GET all tasks
app.get('/tasks', (req, res) => {
    res.render('tasks/index', { tasks })
})

app.post('/task', (req, res) => {
    const { text } = req.body;
    //create new task from task model
    //save to database
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

app.patch('/task/:id/text', (req, res) => {

    let { id } = req.params;
    const { newText } = req.body;
    console.log(req.body)
    console.log(newText);

    //find task with unique id
    let task = tasks.find(t => t.id === parseInt(id));
    if (task.text !== newText) {
        task.text = newText;
    }
    console.log(task);

})
app.patch('/task/:id/colour', (req, res) => {
    console.log('task colour change patch route');

})
app.patch('/task/:id/label', (req, res) => {
    console.log('task label change patch route');

})



// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    //we take in an id and remove the respective task from the array
    let { id } = req.params;

    //find index of task with unique id
    let index = tasks.findIndex(t => t.id === parseInt(id));

    tasks.splice(index, 1)
    console.log(tasks)
    res.send('task deleted!')

})


const port = 3000;
app.listen(port, () => {
    console.log("Listening on port " + port + "; press ctrl-c to exit")
})