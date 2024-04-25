const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomname:{
        type: String, required:true
    },
    maxcount:{
        type: String, required:true
    },
    phonenumber:{
        type: Number, required:true
    },
    rentperday:{
        type: Number, required:true
    },
    imageurls: [],
    currentbookings:[],
    type:{
        type: String, required:true
    },
    description: {
        type: String, required:true
    }
}, {Timestamp:true});

const roomModel = mongoose.model('room', roomSchema);

module.exports= roomModel;