const mongoose = require('mongoose');
const { Schema } = mongoose;
const Task = require('../models/task.js');
const mock_data = require('./mock_data');


const dbUrl = 'mongodb://localhost:27017/tasks-app';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err));



