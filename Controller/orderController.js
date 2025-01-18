const OrderModel = require("../Model/orderModel")


exports.PlaceOrder = async (req, res) => {
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
exports.GetOrder = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: "Missing data", success: false })
    try {
        const order = await OrderModel.find({ userId: id })
        res.status(200).json({
            message: "All orders fetched successfully",
            success: true,
            data: order
        })
    }
    catch (error) {
        res.status(404).json({
            message: error,
            success: false,
        })
    }
}


exports.UpdateOrder = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: "Missing data", success: false })
    try {
        const data = await OrderModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            message: "Update order data successfully",
            success: true,
            data: data
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message, updateData: false })
    }
}

exports.GetAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
        res.status(200).json({
            message: "ALl orders fetched successfully",
            data: orders,
            success: true,
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        })
    }

}