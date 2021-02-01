const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser')
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended : true}))

const tasks = [
    {
        id: 1,
        text: 'test test',
        subtasks: [],
        labels: [],
        colour: 'red'
    }
]

// GET all tasks
app.get('/tasks', (req, res) => {
    res.render('tasks/index', { tasks })
})

// PATCH text
// PATCH array of substasks
// PATCH array of labels
// PATCH colour
app.patch('/tasks/:id', (req, res) => {
    let { id } = req.params;

    let [newProperty, newValue] = Object.entries(req.body)[0];

    let task = tasks.find(t => t.id === parseInt(id));

    for(let property in task){
        if(newProperty == property){
            task[property] = newValue;
        }
    }
    console.dir(tasks[0])
    res.send('patch req received!');
})

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    //we take in an id and remove the respective task from the array
})


app.listen(port, () => {
    console.log("Listening on port " + port + "; press ctrl-c to exit")
}) 