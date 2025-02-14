const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
    firstField: String,
    description: String,
    price: String,
    image: String,
    state: String,
    district: String,
    place: String,
    userName: String,
    userDP: String,
    userAddress: String,
    userContact: String,
    userEmail: String,
    domain: String,
})

module.exports = mongoose.model('field', fieldSchema);