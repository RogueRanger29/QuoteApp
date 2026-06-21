import mongoose, { Schema } from "mongoose";

const quoteSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
            minLength: 5,
            maxLength: 250,
        },

        author: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 15,
        }
    },
    {
        timestamps: true
    }
)

export const Quote = mongoose.model('Quote', quoteSchema)