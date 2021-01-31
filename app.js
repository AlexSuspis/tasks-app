const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const port = 3000;
app.set('view engine', 'ejs')


const tasks = [
    {
        id: uuid(),
        text: 'test test',
        subtasks: [],
        labels: [],
        colour: 'red'
    }
]

// GET all tasks
app.get('/', (req, res) => {
    res.send("hello world")
})




app.listen(port, () => {
    console.log("Listening on port " + port + "; press ctrl-c to exit")
}) 