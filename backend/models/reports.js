const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({

    sub_name: {
        type: String,
        required: true
    },

    reported_by: {
        type: String,
        required: true
    },

    reported_user: {
        type: String,
        required: true
    },

    concern: {
        type: String,
        required: true
    },

    post_text: {
        type: String,
        required: true
    },

    ignored: {
        type: Boolean,
        default: false
    },

    blocked: {
        type: Boolean,
        default: false
    },

    post_id: {
        type: String
    }

}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;