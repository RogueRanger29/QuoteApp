import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 250,
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', userSchema)