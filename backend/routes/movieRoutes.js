import express from 'express';// import express
const router = express.Router(); // using router
import { getTrendingMovies, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory } from '../controllers/MovieController.js'; // import trendingMoviesController
import authenticate from '../middlewares/authMiddleware.js';

router.get('/trending', authenticate, getTrendingMovies)
router.get('/:id/trailers', authenticate, getMovieTrailers)
router.get('/:id/details', authenticate, getMovieDetails)
router.get('/:id/similar', authenticate, getSimilarMovies)
router.get('/:category', authenticate, getMoviesByCategory)

export default router; // export the router