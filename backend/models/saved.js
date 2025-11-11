const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedSchema = new Schema({

    uname: {
        type: String,
        required:true
    },  

    ids : {
        type : [Object]
    },

    // sub_name : {
    //     type : String
    // }
    
}, {timestamps: true});

const Saved = mongoose.model('Saved', savedSchema);
module.exports = Saved;