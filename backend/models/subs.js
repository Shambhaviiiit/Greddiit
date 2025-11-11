// create a schema/model for all subgreddiits
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subsSchema = new Schema({
    moderator:{
        type: String
    },

    sub_name: {
        type: String,
        required: true
    },

    // n_followers: {
    //     type: Number,
    //     default: 1
    // },

    sub_desc: {
        type: String
    },

    n_posts: {
        type: Number,
        default: 0
    },

    followers: {
        type: [String]
    },

    sub_banned: {
        type: [String]
    },

    requests: {
        type: [String]
    }
}, {timestamps:true});

const Subgreddiit = mongoose.model('Subgreddit', subsSchema);
module.exports = Subgreddiit;