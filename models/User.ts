import mongoose from 'mongoose';
import { hash } from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password should be at least 8 characters long'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await hash(this.password, 10);
        next();
    } catch (error) {
        next(error as Error);
    }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);