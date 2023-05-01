const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    type:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    desciption:{
        type: String,
        required: true,
        minlength: 10
    },
    ticketPrices:{
        type: Object,
        default: {}
    }
}, {timestamps: true});

const Service = mongoose.model('service', serviceSchema);
module.exports = Service;