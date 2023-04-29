const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
}, {timestamps: true});

const Services = mongoose.model('Services', servicesSchema);
module.exports = Services;