const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
}, {timestamps: true});

const Type = mongoose.model('type', typeSchema);
module.exports = Type;