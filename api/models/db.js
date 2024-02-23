// db.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const generatedImageSchema = new mongoose.Schema({
    ipAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const GeneratedImage = mongoose.model('GeneratedImage', generatedImageSchema);

export { User, GeneratedImage };
