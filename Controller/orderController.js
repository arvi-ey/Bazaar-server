const OrderModel = require("../Model/orderModel")


exports.PlaceOrder = async () => {
    const {
        productId,
        userId,
        totalPrice,
        quantity,
        deliveryTime,
        size,
        image,
        productTitle,
        paymentMode,
        paymentStatus,
        orderStatus
    } = req.body;
    if (
        !productId ||
        !userId ||
        !totalPrice ||
        !quantity ||
        !deliveryTime ||
        !size ||
        !image ||
        !productTitle ||
        !paymentMode ||
        !paymentStatus ||
        !orderStatus
    ) {
        return res.status(400).json({ order: false, message: "Missing Data" });
    }
    try {
        const result = await OrderModel.create(req.body);
        if (result) {
            res.status(200).json({ order: true, message: "Order placed successfully", data: result });
        }
        else {
            res.status(400).json({ order: false, message: "Failed to place order" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error, order: false });
    }

}