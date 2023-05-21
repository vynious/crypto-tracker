import express from "express";
import { validateToken } from "../../middlewares/validationCheck.js";
import { userProfile, logoutUser} from "../../controllers/userController.js";
import { userAssets } from "../../controllers/assetController.js";

const user = express.Router();

// all requests made to user-related apis must be validated with their token
user.post("/profile", validateToken, userProfile);
user.post("/profile/logout", validateToken, logoutUser);
user.post("/profile/current-assets", validateToken, userAssets);


export {user as default};