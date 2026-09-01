const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile: {type: String, default: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"},
    contact: String,
    state: String,
    district: String,
    village: String,
    cart: [],
    addedItem: []
})

module.exports = mongoose.model('user', userSchema);