const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    posted_by : {
        type: String,
        required: true
    },

    sub_name:{
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    upvotes: {
        type: Number,
        default: 0
    },

    downvotes: {
        type: Number, 
        default: 0
    },

    comments: {
        type: [String]
    },

    true_posted_by: {
        type: String
    }
    
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;