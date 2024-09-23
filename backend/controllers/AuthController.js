import generateToken from "../utils/generateToken.js"; // import generateToken
import bcrypt from "bcryptjs"; // import bcrypt
import User from "../models/User.js"; // import User model

const register = async (req, res) => {
    const { username, email, password } = req.body; // get username,email,password from request.body
    
     if (!username && !email && !password) {
        return res.status(401).send("Please fill all the inputs.") // validation of inputs
    }
    else if (!username) {
        return res.status(401).send("Username is required.") // validation of inputs
    }
    else if (!email) {
        return res.status(401).send("Email is required.") // validation of inputs
    }
    else if (!password) {
        return res.status(401).send("Password is required.") // validation of inputs
    }
    else if (password.length < 8) {
        return res.status(401).send("Password must be at least 8 characters long."); // validation of inputs
    }

    try {
        const userExists = await User.findOne({ email }); // get user exists by email
    
    if (userExists) { // if user exists
       res.status(400).send("User already exists");// User already exists
    }
    const salt = await bcrypt.genSalt(10); // generate salt of 10 characters
    const hashedPassword = await bcrypt.hash(password, salt); // hash password

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.jpg", "/avatar3.png"]
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

    const user = await User.create({ username, email, password: hashedPassword, image });// create new user
    generateToken(res, user._id); // create new token (send response, send user._id)
    res.status(201).json({ 
            _id: user._id, // send the user id in client
            username: user.username, // send the username in client
            email: user.email, // send the email in client
            image: user.image, // send the image in client
            searchHistory: user.searchHistory
    }); // send response json object user in client
    } catch (error) {
        res.status(500).send("Server Error"); // if error occurs, send server error message in response 500 status code  "Server Error"  "Server Error" is a generic error message. This is a standard response for server errors. 500 status code is also known as "Internal Server Error" in HTTP.  "Internal Server Error" indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.  "Internal Server Error" is a serious error and it's recommended to notify the system administrator.  "Internal Server Error" is a 5xx status code.  "Server Error" is a 4xx status code.  "Server Error" is a 3xx status code.  "Server Error" is a 2xx status code.  "Server Error" is a 1xx status code.  "Server Error" is a 0xx
    }

}


const login = async (req, res) => {
    const { email, password } = req.body;// get email,password from request.body
    
    try {
        const existingUser = await User.findOne({email}); // get user exists by email
    
    if (existingUser) { // if user already exists
        const isPasswordValid = await bcrypt.compare(password, existingUser.password); // check password
        if (isPasswordValid) { // if password is valid
            generateToken(res, existingUser._id);// create new token (send response, send user._id)
            return res.json({ 
                _id: existingUser._id, // send the user id in client
                username: existingUser.username, // send the username in client
                email: existingUser.email, // send the email in client
                image: existingUser.image, // send the image in client
                searchHistory: existingUser.searchHistory, // send the search history in client
             }); // send response json object user in client
        }else{
            return res.status(401).send("Email or Password are Invalid"); // if password is invalid
        }
        
    }else{
        return res.status(401).send("Email or Password are Invalid"); // if user does not exist or password is invalid
    }
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt"); // clear the session id cookie
        res.status(200).json({message: 'logout successful'}); // logout successful
    } catch (error) {
        res.status(500).send("Server Error");
    }
}


export { register, login, logout }; // export all functions