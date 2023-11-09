import { Router } from "express";
import {logIn, signUp} from "../controllers/auth.js";
import { verifyUsername } from "../middlewares/auth.js";


const authRouter=Router()

authRouter.post('/login',logIn)
authRouter.post('/signup',
verifyUsername,
signUp)


export default authRouter


