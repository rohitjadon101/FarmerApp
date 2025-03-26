const mongoose = require('mongoose');

const fruitSchema = mongoose.Schema({
    firstField: String,
    description: String,
    price: String,
    quantity: String,
    category: String,
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

module.exports = mongoose.model('fruit', fruitSchema);