const mongoose = require('mongoose');

const otherSchema = mongoose.Schema({
    firstField: String,
    description: String,
    price: String,
    quantity: String,
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

module.exports = mongoose.model('other', otherSchema);