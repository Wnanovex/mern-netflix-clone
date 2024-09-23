import mongoose from "mongoose"; // import mongoose

const userSchema = mongoose.Schema({ // build the columns in table users
    username: {
        type: String,
        required: true,
        trim: true, // remove the spaces from end && start string
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true, // remove the spaces from end && start string
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true, // remove the spaces from end && start string
        minlength: 8,
    },
    image: {
        type: String,
        default: "", // default image to null if no image provided
    },
    searchHistory: {
        type: Array, 
        default: [], // default array to null if no search history provided
    }
},
 {timestamps: true} // create_at && update_at 
)

const User = mongoose.model("User", userSchema); // create a users table

export default User; // export the User models