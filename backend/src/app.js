import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

import quoteRouter from './routes/quote.route.js'
import userRouter from './routes/user.route.js'

app.use('/api/v1/quotes', quoteRouter)
app.use('/api/v1/auth', userRouter)
export default app