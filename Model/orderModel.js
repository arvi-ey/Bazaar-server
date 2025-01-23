const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true,
        trim: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['PAID', 'PENDING', 'REFUNDED'],
    },
    orderDate: {
        type: Date,
        required: true
    },
    orderAddress: {
        type: String,
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['PLACED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED', 'CANCELLED', "RETURNED"],
    }

})

module.exports = mongoose.model('Order', orderSchema);