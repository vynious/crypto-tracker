import asyncHandler from "express-async-handler";

//@desc logout the user
//@route POST /profile/logout
//@private
export const logoutUser = asyncHandler( async (req, res) => {
    // destroy session cookie 
    console.log(req.user); 
    req.user = {}; // resets the req.user; 
    res.status(200).json({message:"successfully logged out",user: req.user});
})

//@desc see profile of the user
//@route GET /profile
//@private 
export const userProfile = asyncHandler(async (req, res) => {
    res.status(200).json({user: req.user});
})

