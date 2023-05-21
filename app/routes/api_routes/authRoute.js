import express from "express";
import {registerUser, loginUser} from "../../controllers/authController.js";


const auth = express.Router();


auth.post("/register", registerUser);
auth.post("/login", loginUser);


export { auth as default };