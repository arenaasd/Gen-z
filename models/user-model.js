const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minlength: 3
    },
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
})

module.exports = mongoose.model('user', userSchema)