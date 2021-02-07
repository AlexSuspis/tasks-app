const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser')
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))
app.use(express.static('images'))
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended : true}))

const tasks = [
    {
        id: 1,
        text: 'Feed cat',
        subtasks: [
            {
                text: 'wash bowl'
            },
            {
                text: 'buy food'
            }
        ],
        labels: [],
        colour: 'red'
    },
    {
        id: 2,
        text: 'Water plants',
        subtasks: [
            {
                text: 'water!!!'
            },
            {
                text: 'buy food'
            }
        ],
        labels: [],
        colour: 'red'
    }
]

// GET all tasks
app.get('/tasks', (req, res) => {
    res.render('tasks/index', { tasks })
})

//PATCH endpoint for changing the following task properties: subtasks array, colour, labels array, inner text
app.patch('/tasks/:id', (req, res) => {
    let { id } = req.params;
    let [newProperty, newValue] = Object.entries(req.body)[0];

    //find task with unique id
    let task = tasks.find(t => t.id === parseInt(id));

    //find task's property that's equal to key of req.body object, if any exists.
    //if found, replace its value with value from req.body object.
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
    let {id} = req.params;

    //find index of task with unique id
    let index = tasks.findIndex(t => t.id === parseInt(id));

    tasks.splice(index,1)
    console.log(tasks)
    res.send('task deleted!')
    
})


app.listen(port, () => {
    console.log("Listening on port " + port + "; press ctrl-c to exit")
}) 