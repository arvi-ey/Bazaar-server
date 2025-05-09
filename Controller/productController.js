const productModel = require("../Model/productModel")
const ProductModel = require("../Model/productModel")

exports.AddProduct = async (req, res) => {
    const { title, description, price, category, stock, images, deliveryTime } = req.body
    if (!title || !price || !category || !stock || !images || !deliveryTime) {
        res.status(404).json({ mesage: "Missing Data" })
    }
    else {
        try {
            const Product = await ProductModel.create(req.body)
            res.status(200).json({
                message: "Product successfully added",
                status: "success",
                data: Product
            })

        }
        catch (error) {
            res.status(500).json({
                mesage: error.mesage,
                status: "Unsuccessfull"
            })
        }
    }
}

exports.UpdateProduct = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: "Missing product id" })
    else {
        try {
            const newProduct = await ProductModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
            res.status(200).json({
                message: "Product update successfull",
                status: "success",
                data: newProduct
            })
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

exports.DeleteProduct = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: "Missing data" })
    try {
        const DeletedProduct = await ProductModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Product deleted successfully", data: DeletedProduct })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.GetAllProduct = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const category = req.query.category || "all";
    const skip = (page - 1) * limit;
    const sortquery = req.query.sort || "dsc";
    const sortOption = sortquery === "dsc" ? -1 : 1;
    const filter = category !== "all" ? { category } : {};
    try {
        let products
        products = await ProductModel.find(filter)
            .sort({ price: sortOption })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Fetch all product successful",
            status: "successful",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


exports.Filteredproducts = async (req, res) => {
    const price = Number(req.query.price);
    console.log("Received price from query:", price); // 🪵 Debug log

    if (price) {
        try {
            const products = await ProductModel.find({ price: { $lt: price } });
            res.status(200).json({
                message: "Fetch Filtered product successful",
                status: "successful",
                data: products
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

exports.GetHomeProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 20
    try {
        const products = await ProductModel.find().limit(limit)
        res.status(200).json({
            mesage: "Fetching home products successfully",
            status: "successfull",
            data: products
        })

        // const Dataproduct = await productModel.find()
        // for (let i of Dataproduct) {
        //     const randomNumber = (Math.floor(Math.random() * 3) + 5) / 2;
        //     console.log(randomNumber)
        //     const obj = {
        //         ratings: randomNumber
        //     }
        //     await ProductModel.findByIdAndUpdate(i._id, { $set: obj })
        // }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.GetAllProductAdmin = async (req, res) => {
    try {
        const Product = await ProductModel.find().sort({ price: - 1 })
        res.status(200).json({
            message: "Fetch all product successfull",
            status: "successfull",
            data: Product
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.mesage
        })
    }
}


exports.GetSingleProduct = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: "Missing product id" })
    try {
        const Product = await ProductModel.findById(id)
        res.status(200).json({
            message: "Fetch product successfull",
            status: "successfull",
            data: Product
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.mesage
        })
    }
}

exports.GetAllProductByCategory = async (req, res) => {
    const { category } = req.params
    if (!category) res.status(404).json({ message: "Missing product category", success: false })
    try {
        const Product = await ProductModel.find({ category })
        res.status(200).json({
            message: "Fetch product by category successfull",
            status: "successfull",
            data: Product,
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.mesage,
            success: false
        })
    }
}
