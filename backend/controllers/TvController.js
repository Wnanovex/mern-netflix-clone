import { fetchFromTMDB } from "../services/tmdbServices.js";


const getTrendingTv = async (req, res) => {
   try {
    const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
    res.json({success: true, content: randomMovie});
   } catch (error) {
    res.status(500).send("Server Error");
   }
}

const getTvTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({success: true, trailers: data.results});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const getTvDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success: true, tv: data});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const getSimilarTvs = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}  

const getTvsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

export { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvsByCategory }; // export all functions