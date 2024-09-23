import axios from "axios";

export const fetchFromTMDB = async (url) => {

  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMDB_API_KEY
      }
  };

  const response = await axios.get(url, options)
  if (response.status !== 200) {
    throw new Error(`Failed to fetch data from TMDB: ${response.status}`);  // Throw an error if the response status is not 200 (OK)
  }
  return response.data;
}
  
