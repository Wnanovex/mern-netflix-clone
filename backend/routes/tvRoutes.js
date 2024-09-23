import express from 'express';// import express
const router = express.Router(); // using router
import { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvsByCategory } from '../controllers/TvController.js'; // import trendingMoviesController
import authenticate from '../middlewares/authMiddleware.js'; // import authenticate middleware

router.get('/trending', authenticate, getTrendingTv)
router.get('/:id/trailers', authenticate, getTvTrailers)
router.get('/:id/details', authenticate, getTvDetails)
router.get('/:id/similar', authenticate, getSimilarTvs)
router.get('/:category', authenticate, getTvsByCategory)

export default router; // export the router