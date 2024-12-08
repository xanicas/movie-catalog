import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.VUE_APP_TMDB_API_KEY;

export const fetchMovies = async (page = 1, genreId = null) => {
    try {
        const params = {
            api_key: API_KEY,
            page: page,
        };
        if (genreId) {
            params.with_genres = genreId;
        }

        const response = await axios.get(`${API_URL}/discover/movie`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export const fetchGenres = async () => {
    try {
        const response = await axios.get(`${API_URL}/genre/movie/list?language=en`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data.genres;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
};

export const searchMovies = (query) => {
    return axios.get(`${API_URL}/search/movie`, {
        params: {
            api_key: API_KEY,
            query,
        }
    });
};