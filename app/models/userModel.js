import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required: [true, "input username"]
    },
    email: {
        type: String,
        required: [true, "input email"],
        unique: [true, "email taken"]
    },
    password: {
        type: String,
        required: [true, "input password"],
    }

}, {timestamps: true});

export default mongoose.model("User", userSchema);