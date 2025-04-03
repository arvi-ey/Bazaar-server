const UserModel = require("../Model/userModel")
const { uploadImage, deleteImage } = require("../Helper/cloudinaryHelper")
const userModel = require("../Model/userModel")

exports.AddUser = async (req, res) => {
    const { name, email, phone_number } = req.body
    if (!name || !email || !phone_number) res.status(404).json({ message: "Missing data" })
    else {
        try {
            const user = await UserModel.create()
            res.status(200).json({
                message: "User aded successfully",
                data: user
            })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}


exports.GetUser = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).jsoon({ message: "Missing data" })
    try {
        const user = await UserModel.findById(id)
        res.status(200).json({
            message: "User fetched successfully",
            data: user
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}


exports.UploadImage = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ error: "Missing userId" });
    }
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: "Missing file" });
    }
    try {
        const imageFile = req.files.image;
        const userData = await userModel.findById(id)
        if (userData?.profile_image && userData?.image_public_id) {
            await deleteImage(userData?.image_public_id)
        }
        const result = await uploadImage(imageFile.tempFilePath);
        const updateobj = {
            profile_image: result.imageUrl,
            image_public_id: result.publicId
        }
        const updatedData = await UserModel.findByIdAndUpdate(id, { $set: updateobj }, { new: true })
        res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: updatedData
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.UpdateUser = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: "Missing data" })
    try {
        const updatedData = await UserModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: updatedData
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}