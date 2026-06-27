import { Router } from "express";
import { signUp, signIn, getUser } from "../controllers/user.controller.js";

const router =  Router()

router.route('/sign-up').post(signUp)
router.route('/sign-in').post(signIn)
router.route('/me').get(getUser)

export default router