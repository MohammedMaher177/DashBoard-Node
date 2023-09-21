import { Router } from "express";
import { signin, signup, verifyemail } from "./controller/auth.controller.js";
import { signinValidation, signupValidation } from "./controller/auth.validation.js";
import { validate } from "../../middleware/validation.js";


const authRouter = Router()

authRouter.post("/signup", validate(signupValidation), signup)
authRouter.post("/signin", signin)
authRouter.post("/login", signin)
authRouter.get("/verifyemail/:verifyToken", verifyemail)

export default authRouter