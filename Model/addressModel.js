const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: Number
    },
    userId: {
        type: String,
    },
    street: {
        type: String,
        required: [true, 'Street is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    pinCode: {
        type: String,
        required: [true, 'Postal Code is required'],
        trim: true
    },
    landmark: {
        type: String,
    },
    houseNumber: {
        type: Number,
    },
    addressType: {
        type: String,
    },
    isDefault: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Address", addressSchema)