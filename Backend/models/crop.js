const mongoose = require('mongoose');

const cropSchema = mongoose.Schema({
    firstField: String,
    description: String,
    price: String,
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

module.exports = mongoose.model('crop', cropSchema);