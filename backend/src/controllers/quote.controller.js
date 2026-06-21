import { Quote } from "../models/quote.model.js";

const createQuote = async (req, res) => {
    try {
        const {text, author} = req.body

        if (!text || !author){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const quote = await Quote.create({text, author})
        return res.status(201).json({
            message: "Quote created successfully",
            quote
        })
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find()
        res.status(200).json(quotes)
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
export {
    createQuote,
    getQuotes
}