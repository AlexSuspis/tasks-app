const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    colour: String,
    parentTask: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    subtasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    position: {
        type: Number,
        required: true
    },
    labels: []
})

module.exports = mongoose.model('Task', taskSchema);