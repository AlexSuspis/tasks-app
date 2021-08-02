const mongoose = require('mongoose');
const { Schema } = mongoose;
const Task = require('../models/task.js');
const { tasks } = require('./mock_data');


const dbUrl = 'mongodb://localhost:27017/tasks-app';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err));


seedDB = async () => {

    await Task.deleteMany({});

    for (let task of tasks) {
        const t = new Task({
            text: task.text,
            colour: task.colour,
            // subtasks: task.subtasks,
            // labels: task.labels
        })

        await t.save();
    }
}

seedDB().then(() => mongoose.connection.close());

