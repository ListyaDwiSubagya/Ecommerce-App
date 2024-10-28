import express from "express"
import {loginUser, resgiterUser, adminLogin} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', resgiterUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;