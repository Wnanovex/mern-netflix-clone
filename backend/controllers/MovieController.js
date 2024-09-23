import { fetchFromTMDB  } from "../services/tmdbServices.js";


const getTrendingMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.json({success: true, content: randomMovie});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const getMovieTrailers = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.status(200).json({success: true, trailers: data.results});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({success: true, movie: data});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const getSimilarMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        res.status(500).send("Server Error");
    }
} 

const getMoviesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

export { getTrendingMovies, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory }; // export all functions