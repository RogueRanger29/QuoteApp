import { Quote } from "../models/quote.model.js";
import jwt from 'jsonwebtoken'

const createQuote = async (req, res) => {
    try {
        const {text, author} = req.body

        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            })
        }   

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        if (!text || !author){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingQuote = await Quote.findOne({ text })

        if (existingQuote){
            return res.status(409).json({
                message: "Duplicate Quote"
            })
        }

        const quote = await Quote.create({text, author})
        return res.status(201).json({
            message: "Quote created successfully",
            quote
        })
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find()
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            })
        }   

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        res.status(200).json(quotes)
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export {
    createQuote,
    getQuotes
}