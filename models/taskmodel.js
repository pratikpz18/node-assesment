const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    task:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Task',TaskSchema);