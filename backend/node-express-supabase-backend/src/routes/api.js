import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// User registration
router.post('/auth/register', registerUser);

// User login
router.post('/auth/login', loginUser);

// User logout
router.post('/auth/logout', logoutUser);

// Additional routes can be added here

export default router;