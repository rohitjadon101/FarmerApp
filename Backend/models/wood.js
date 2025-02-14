const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    category: String,
    userName: String,
    userAddress: String,
    userContact: String,
    userEmail: String,
})

module.exports = mongoose.model('wood', woodSchema);