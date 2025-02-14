const mongoose = require('mongoose');

const bhusaSchema = mongoose.Schema({
    image: String,
    price: String,
    category: String,
    userName: String,
    userAddress: String,
    userContact: String,
    userEmail: String,
})

module.exports = mongoose.model('bhusa', bhusaSchema);