import { Router } from "express";
import { createQuote, getQuotes } from "../controllers/quote.controller.js";

const router =  Router()

router.route('/create').post(createQuote)
router.route('/getQuotes').get(getQuotes)

export default router