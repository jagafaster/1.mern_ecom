import express from 'express';
import { registerUser, loginUser, adminLogin } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// New profile routes
userRouter.get('/profile', authUser, getProfile);
userRouter.put('/profile', authUser, updateProfile);

export default userRouter;