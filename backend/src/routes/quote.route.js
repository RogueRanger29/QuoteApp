import { Router } from "express";
import { createQuote, getQuotes } from "../controllers/quote.controller.js";
import { limiter } from "../limiter.js"

const router =  Router()

router.route('/create').post(limiter, createQuote)
router.route('/getQuotes').get(getQuotes)

export default router