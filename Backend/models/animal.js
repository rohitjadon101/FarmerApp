const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    firstField: String,
    description: String,
    price: Number,
    image: String,
    category: String,
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

module.exports = mongoose.model('animal', animalSchema);