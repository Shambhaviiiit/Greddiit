const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = new Schema({
    uname: {
        type: String,
        required: true
    },

    followers: {
        type: [String]
    },

    following: {
        type: [String]
    }

}, {timestamps: true});

const Follower_list = mongoose.model('Follower_list', followSchema);
module.exports = Follower_list;