import dotenv from 'dotenv'
import connectDB from './config/database.js'
import app from './app.js'

dotenv.config({
    path: './.env'
})

const startServer = async () => {
    try {
        await connectDB()
        app.on("error", (error) => {
            console.log("err", error)
            throw Error
        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("mongo conn fail", error)
    }
}

startServer()