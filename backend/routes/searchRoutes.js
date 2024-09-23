import express from 'express';// import express
const router = express.Router(); // using router
import { searchPerson, searchMovie, searchTv, getSearchHistory, removeItemFromSearchHistory } from '../controllers/SearchController.js'; // import searchPersonController
import authenticate from '../middlewares/authMiddleware.js'; // import authenticate middleware

router.get('/person/:query', authenticate, searchPerson)
router.get('/movie/:query', authenticate, searchMovie)
router.get('/tv/:query', authenticate, searchTv)

router.get('/history', authenticate, getSearchHistory)

router.delete('/history/:id', authenticate, removeItemFromSearchHistory)


export default router; // export the router