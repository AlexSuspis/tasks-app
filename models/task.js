const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    colour: String,
    subtasks: [],
    labels: []
})

module.exports = mongoose.model('Task', taskSchema);