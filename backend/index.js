//packages
import express from 'express'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path';

// Imports files
import connectDB from './config/db.js'; // import connectDB
import authRoutes from './routes/authRoutes.js'; // import authRoutes
import movieRoutes from './routes/movieRoutes.js'
import tvRoutes from './routes/tvRoutes.js'; // import
import searchRoutes from './routes/searchRoutes.js'


dotenv.config() 

connectDB() // connection to database 

const app = express();
app.use(cors())

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());

const __dirname = path.resolve()

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/tv', tvRoutes);
app.use('/api/search', searchRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

// Running the server
const port = process.env.PORT || 8000; // default port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

