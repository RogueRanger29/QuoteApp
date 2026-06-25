import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
    try {
        const { email, password } =  req.body
    
        if (!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
    
        const existingUser = await User.findOne({ email })
    
        if (existingUser){
            return res.status(409).json({
                message: "User Already Exists"
            })
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = await User.create({email, password: hashedPassword})
    
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    
        return res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            data: {
                token,
                user: newUser
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const signIn = async (req, res) => {
    try{
        const { email, password } =  req.body

        if (!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })

        if (!user){
            return res.status(409).json({
                message: "Couldn't find user"
            })
        }

        const correctPassword = await bcrypt.compare(password, user.password)

        if (!correctPassword){
            return res.status(401).json({
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data:{
                token,
                user
            }
        })
    }
    catch (error){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getUser = async (req, res) => {
    try {
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

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}