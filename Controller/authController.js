const UserModel = require("../Model/userModel")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



exports.UserSignIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(404).json({ message: "Missing Data" })
    else {
        try {
            const user = await UserModel.findOne({ email })
            if (!user) return res.status(200).json({
                message: "This email doesnot exists, please sign up first",
                user: false,
                authenticate: false,
                email: false
            })
            else {
                const checkPassword = await bcrypt.compare(password, user.password)
                if (checkPassword === false) {
                    // console.log(checkPassword)
                    res.status(200).json({ message: "Wrong email or password", user: false, authenticate: false })
                }
                else {
                    const sessionData = jwt.sign({ id: user._id, role: user.userType, name: user.name, phone: user.phone_number, email: user.email }, process.env.JWT_SECRET,);
                    res.cookie('token', sessionData, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                        maxAge: 60 * 24 * 60 * 60 * 1000
                    });
                    res.status(200).json({
                        message: "User loggedin succcesfully",
                        user: user,
                        authenticate: true,
                        session: sessionData
                    })
                }
            }
        }
        catch (error) {
            return res.status(500).json({
                message: error
            })
        }

    }
}


exports.GoogleAuth = async (req, res) => {
    try {
        const { name, email, } = req.body
        if (!name || !email) return res.status(400).json({
            message: "Missing data",
            user: false,
            statusCode: 400
        })
        const result = await UserModel.findOne({ email })
        if (result?.email && result?._id) {
            const sessionData = jwt.sign({ id: result._id, role: result.userType, name: result.name, email: result.email }, process.env.JWT_SECRET,);
            res.cookie('token', sessionData, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 60 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                message: "User loggedin succcesfully",
                user: result,
                authenticate: true,
                session: sessionData,
                statusCode: 200
            })
        }
        else {
            const userData = await UserModel.create(req.body)
            const sessionData = jwt.sign({ id: userData._id, role: userData.userType, name: userData.name, email: userData.email }, process.env.JWT_SECRET);
            res.cookie('token', sessionData, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 60 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                message: "User Created succcesfully",
                user: userData,
                authenticate: true,
                session: sessionData,
                statusCode: 200
            })
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            user: false
        })
    }
}

exports.UserSignUp = async (req, res) => {
    const { name, email, phone_number, password } = req.body
    if (!name || !email || !phone_number || !password) res.status(404).json({ message: "Missing Data" })
    else {
        const emailExist = await UserModel.findOne({ email })
        if (emailExist) res.status(409).json({ message: "Email id already exists", error: "email", user: false })
        else {
            const numberExist = await UserModel.findOne({ phone_number })
            if (numberExist) res.status(409).json({ message: "Phone number already exists", error: "phone_number", user: false })
            else {
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hassedPassword = await bcrypt.hash(password, salt)
                    const userData = await UserModel.create({ ...req.body, password: hassedPassword })
                    const sessionData = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: "User successfully created",
                        user: true,
                        data: userData,
                        session: sessionData
                    })
                }
                catch (error) {
                    res.status(500).json({
                        message: error,
                        user: false
                    })
                }
            }
        }

    }

}

exports.UserLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        res.status(200).json({
            message: "User logged out successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Logout failed",
            error: error.message,
            success: false,
        });
    }
};
