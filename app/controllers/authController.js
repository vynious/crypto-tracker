import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const validPassword = (password) => {
    const regexExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regexExp.test(password);
}

//@desc Register the user
//@route POST /register
//@public 
export const registerUser = asyncHandler(async (req, res) => { 
    const {username, email, password} = req.body;
    
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    // password validity 
    const isValid = await validPassword(password);
    if (!isValid) {
        res.status(400)
        throw new Error("password is not valid");
    } 

    const userExist = await User.findOne({email});

    if (userExist) {
        res.status(400);
        throw new Error("email is already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json(user);
        console.log("user successfully registered");
    } else {
        res.status(400);
        throw new Error("account creation failed");
    }
})

//@desc Login the user
//@route POST /login
//@public 
export const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;
    
    if (!email || !password) {
        res.status(400);
        throw new Error("all fields are needed.");
    }

    const user = await User.findOne({email});
    
    if (user && await bcrypt.compare(password,user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "50m"});

        delete user.password; 

        res.status(201).json({message: "successful login", access_token: accessToken});
        console.log(accessToken);

    } else {
        res.status(401);
        throw new Error("incorrect pasword/email");
    }

})

