import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";


// check if all requests made to main apis have a JWT
export const validateToken = asyncHandler(async (req, res, next) => {
    let accessToken;
    let authHeaders = req.headers.authorization || req.headers.Authorization;
    // console.log(req);
    if (authHeaders && authHeaders.startsWith("Bearer")) {
        accessToken = authHeaders.split(" ")[1];
        jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("unauthorised access");
            } else {
                req.user = decoded.user;
                next();
            }   
     
        })
    } else {
        res.status(401).redirect("/main/login");
        throw new Error("unauthorised / no access token");
    }
})