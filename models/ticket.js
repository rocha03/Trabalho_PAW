const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    Id_User:{
        type: Int32,
        required: true
    },
    Id_Service:{
        type: Int32,
        required: true
    },
}, {timestamps: true});

const Tickets = mongoose.model('Ticket', ticketSchema);
module.exports = Tickets;