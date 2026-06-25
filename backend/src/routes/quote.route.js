import { Router } from "express";
import { createQuote, getQuotes } from "../controllers/quote.controller.js";
import { quoteLimiter } from "../limiter.js"

const router =  Router()

router.route('/create').post(quoteLimiter, createQuote)
router.route('/getQuotes').get(getQuotes)

export default router