let mongoose = require('mongoose');

let formSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 10
    },
    file: {
        type: String,
        required: true
    }
});

let Form = mongoose.model('Form', formSchema);
module.exports = Form;
