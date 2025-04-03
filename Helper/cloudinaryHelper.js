const cloudinary = require("../Config/ClouinaryConfig");

const uploadImage = async (imagePath) => {
    const options = {
        use_filename: false,
        unique_filename: true,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        return {
            publicId: result.public_id,
            imageUrl: result.secure_url
        }
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};


const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Image deletion failed:", error);
        throw error;
    }
};

module.exports = { uploadImage, deleteImage };


// /-> Sample output whicg cloudinary returns
// {
//   "asset_id": "bf98540caf22ed65775ee0951f4746c9",
//   "public_id": "cld-sample",
//   "format": "jpg",
//   "version": 1719304891,
//   "resource_type": "image",
//   "type": "upload",
//   "created_at": "2024-06-25T08:41:31Z",
//   "bytes": 476846,
//   "width": 1870,
//   "height": 1250,
//   "backup": true,
//   "asset_folder": "",
//   "display_name": "cld-sample",
//   "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719304891/cld-sample.jpg",
//   "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719304891/cld-sample.jpg",
//   "next_cursor": "497b323dcb9883a15a5e6a7cfb75d439e4de1ca882f5cbe8de6a8b322c37bdad",
//   "derived": [
//     {
//       "transformation": "c_scale,w_500",
//       "format": "jpg",
//       "bytes": 22871,
//       "id": "ce3d7bf3068809656dc5aa76572535da",
//       "url": "http://res.cloudinary.com/cld-docs/image/upload/c_scale,w_500/v1719304891/cld-sample.jpg",
//       "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/c_scale,w_500/v1719304891/cld-sample.jpg"
//     }
//   ]
// }