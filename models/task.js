const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    colour: String,
    subtasks: [Schema.Types.ObjectId],
    parentTask: Schema.Types.ObjectId,
    position: Number,
    labels: []
})

module.exports = mongoose.model('Task', taskSchema);