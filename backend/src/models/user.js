import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    provider: String,
    publishedDate: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model("User", userSchema);

export default User;