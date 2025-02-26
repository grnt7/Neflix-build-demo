//also stored in .env

const API_KEY = "d6c2fcac5804918d86db48823cca9eb9";

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&LANGUAGE=EN-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated:      `/movie/top_rated/api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComdedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

};

export default requests;

//https://api.themoviedb.org/3/trending/all/week?api_key=d6c2fcac5804918d86db48823cca9eb9&language=en-US