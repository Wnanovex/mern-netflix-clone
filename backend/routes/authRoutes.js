import express from 'express';// import express
const router = express.Router(); // using router
import { register, login, logout } from '../controllers/AuthController.js';// import AuthController

router.post('/signup', register)// create a new user

router.post('/login', login) // login user with a post method

router.post('/logout', logout) // log out user with a post method


export default router; // export the router