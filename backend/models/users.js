// create user schema and user model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    uname: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    }

}, {timestamps: true});

const Username = mongoose.model('Username', userSchema);
module.exports = Username;
