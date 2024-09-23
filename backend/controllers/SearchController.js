import { fetchFromTMDB } from "../services/tmdbServices.js";
import User from "../models/User.js";

const searchPerson = async (req, res) => {
    const { query } = req.params; // get name from params parameters

   try {
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
    if (response.results.length === 0) {
        return res.status(404).send(null); 
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].profile_path,
                title: response.results[0].name,
                searchType: "person",
                createdAt: new Date(),
            },
        }
    })
    
    res.status(200).json({success: true, content: response.results});
   } catch (error) {
    res.status(500).send("Server Error");
   }
}

const searchMovie = async (req, res) => {
    const { query } = req.params; // get name from params parameters

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
    if (response.results.length === 0) {
        return res.status(404).send(null); 
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].backdrop_path,
                title: response.results[0].original_title,
                searchType: "movie",
                createdAt: new Date(),
            },
        }
    })
    
    res.status(200).json({success: true, content: response.results});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const searchTv = async (req, res) => {
    const { query } = req.params; // get name from params parameters

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
    if (response.results.length === 0) {
        return res.status(404).send(null); 
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].backdrop_path,
                title: response.results[0].name,
                searchType: "tv",
                createdAt: new Date(),
            },
        }
    })
    
    res.status(200).json({success: true, content: response.results});
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({ success: true, history: req.user.searchHistory });
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const removeItemFromSearchHistory = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        })
        
        res.status(200).json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

export { searchPerson, searchMovie, searchTv, getSearchHistory, removeItemFromSearchHistory }; // export all functions