import express from "express";
import { isAuthenticated as auth} from "../auth/auth.js";
import * as userController  from "../controllers/userController.js";

const router = express.Router()

//router.get('/info/:uid', auth, userController.getUser)
router.get('/info/:uid', userController.getUser)
router.delete('/delete/:uid', userController.deleteUser)
router.patch('/update/:uid', userController.updateUser)
router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.get('/refreshtoken/:uid', userController.refreshToken)

router.get('/auth/google', userController.googleSignin)
router.get('/auth/github/', userController.githubSignin)
router.get('/auth/google/callback')
export default router