import React, { useState, useEffect } from 'react';
import "./Styles/row.css";
import axios from "./axios";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


function Row({ title, fetchUrl, isLargeRow = true }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); // Track the selected movie
    const base_url = "https://image.tmdb.org/t/p/original/";

    const fetchTrailerKey = async (movie) => {
        try {
            const videoRequest = await axios.get(
                `/movie/${movie.id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
              );
           
            const trailer = videoRequest.data.results.find(
                (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            ) || videoRequest.data.results.find(
                (vid) => vid.type === "Teaser" && vid.site === "YouTube"
            ) || videoRequest.data.results.find(
                (vid) => vid.site === "YouTube"
            );
            return trailer ? trailer.key : null;
        } catch (error) {
            console.error("Error fetching TMDB trailers:", error);
            if (error.response) {
                console.error("API Error Response:", error.response.data);
                console.error("API Error Status:", error.response.status);
            }
            try {
                const url = await movieTrailer(movie.title || movie.name || "");
                if (url) {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    return urlParams.get('v');
                }
                return null;
            } catch (trailerError) {
                console.error("movie-trailer error:", trailerError);
                return null;
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            const moviesWithTrailers = await Promise.all(
                request.data.results.map(async (movie) => {
                    const trailerKey = await fetchTrailerKey(movie);
                    return { ...movie, trailerKey };
                })
            );
            setMovies(moviesWithTrailers);
            return request;
        }
        fetchData();
    }, [fetchUrl]);



    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            const moviesWithTrailers = await Promise.all(
                request.data.results.map(async (movie) => {
                    try {
                        const videoRequest = await axios.get(
                            `/movie/${movie.id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
                        );
                        console.log("Video Request Data:", videoRequest.data); // Add this line
                        const trailer = videoRequest.data.results.find(
                            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                        );
                        return {
                            ...movie,
                            trailerKey: trailer ? trailer.key : null,
                        };
                    } catch (error) {
                        console.error("Error fetching trailers:", error);
                        return { ...movie, trailerKey: null };
                    }
                })
            );
            setMovies(moviesWithTrailers);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "500px",
        width: "800px",
        playerVars: {
        autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleClose = () => {
        setSelectedMovie(null); // Set selectedMovie to null to close
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <React.Fragment key={movie.id}> {/* Use a Fragment to group elements */}
                            <img
                                key={movie.id}
                                className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name || movie.title || "Movie Poster"}
                                onClick={() => handleClick(movie)}
                            />
                             {console.log("Trailer Key:", movie.trailerKey)} 
                            {selectedMovie && selectedMovie.id === movie.id && movie.trailerKey && (
                                
                                <div className="trailer-container">
                                     <button onClick={handleClose} className="close-button">
                                     <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="close-icon"
                >
                    <line x1="10" y1="2" x2="2" y2="10" />
                    <line x1="2" y1="2" x2="10" y2="10" />
                </svg>
                
            </button>
            <YouTube videoId={movie.trailerKey} opts={opts} />
                                   
                                </div>
                            )}
                            {selectedMovie && selectedMovie.id === movie.id && !movie.trailerKey && (
                                <p>Trailer Not Found</p>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Row;



/*
// ... inside the movies.map function ...

import React, { useState, useEffect } from 'react';
import "./Styles/row.css";
import axios from "./axios";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'; // Import movie-trailer

function Row({ title, fetchUrl, isLargeRow = true }) {
    // ... (other state and variables)

    const fetchTrailerKey = async (movie) => {
        try {
            const videoRequest = await axios.get(
                `/movie/<span class="math-inline">\{movie\.id\}/videos?api\_key\=</span>{process.env.TMDB_API_KEY}&language=en-US`
            );
            const trailer = videoRequest.data.results.find(
                (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            ) || videoRequest.data.results.find(
                (vid) => vid.type === "Teaser" && vid.site === "YouTube"
            ) || videoRequest.data.results.find(
                (vid) => vid.site === "YouTube"
            );
            return trailer ? trailer.key : null;
        } catch (error) {
            console.error("Error fetching TMDB trailers:", error);
            if (error.response) {
                console.error("API Error Response:", error.response.data);
                console.error("API Error Status:", error.response.status);
            }
            try {
                const url = await movieTrailer(movie.title || movie.name || "");
                if (url) {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    return urlParams.get('v');
                }
                return null;
            } catch (trailerError) {
                console.error("movie-trailer error:", trailerError);
                return null;
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            const moviesWithTrailers = await Promise.all(
                request.data.results.map(async (movie) => {
                    const trailerKey = await fetchTrailerKey(movie);
                    return { ...movie, trailerKey };
                })
            );
            setMovies(moviesWithTrailers);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // ... (opts and handleClick)

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <React.Fragment key={movie.id}>
                            <img
                                key={movie.id}
                                className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                                src={`<span class="math-inline">\{base\_url\}</span>{isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name || movie.title || "Movie Poster"}
                                onClick={() => handleClick(movie)}
                            />
                            {console.log("Trailer Key:", movie.trailerKey)}
                            {selectedMovie && selectedMovie.id === movie.id && movie.trailerKey && (
                                <div className="trailer-container">
                                    <YouTube videoId={movie.trailerKey} opts={opts} />
                                </div>
                            )}
                            {selectedMovie && selectedMovie.id === movie.id && !movie.trailerKey && (
                                <p>Trailer Not Found</p>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Row;


papacode

import React, { useState, useEffect } from 'react';
import "./Styles/row.css";
import axios from "./axios";
import YouTube from 'react-youtube';

function Row({ title, fetchUrl, isLargeRow = true }) {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters"> {/* Add a container for the posters }
            {movies && movies.length > 0 ? ( // Check if movies exists AND has data
              movies.map((movie) => ( 
                
                  <img 
                      key={movie.id || movie.poster_path || movie.backdrop_path} // Add a unique key!
                      className={`row-poster ${isLargeRow && "row-posterLarge"}`}//add classes
                     
                      src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                      alt={movie.name || movie.title || "Movie Poster"} // Provide a default alt
                  />
                
                  
              ))
          ) : (
              <p>Loading...</p> // Or a suitable placeholder like a spinner
          )}
      </div>
      
  </div>
  
);
}

export default Row;



*/


















/*
original papa code

import React, { useState, useEffect } from 'react';
import "./Styles/row.css";
import axios from "./axios";
import YouTube from 'react-youtube';

function Row({ title, fetchUrl, isLargeRow = true }) {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters"> {/* Add a container for the posters }
            {movies && movies.length > 0 ? ( // Check if movies exists AND has data
              movies.map((movie) => ( 
                
                  <img 
                      key={movie.id || movie.poster_path || movie.backdrop_path} // Add a unique key!
                      className={`row-poster ${isLargeRow && "row-posterLarge"}`}//add classes
                     
                      src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                      alt={movie.name || movie.title || "Movie Poster"} // Provide a default alt
                  />
                
                  
              ))
          ) : (
              <p>Loading...</p> // Or a suitable placeholder like a spinner
          )}
      </div>
  </div>
);
}

export default Row;






















//all large posters code Gemini

function Row({ title, movies, isLargeRow }) { // Assuming isLargeRow is passed as a prop
  const base_url = "https://image.tmdb.org/t/p/original/";

  // Ensure isLargeRow is always true (if you want all large)
  isLargeRow = true;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <img
              key={movie.id || movie.poster_path || movie.backdrop_path}
              className={`row-poster ${isLargeRow && "row-posterLarge"}`}
              src={`${base_url}${movie.poster_path}`} // Always use poster_path
              alt={movie.name || movie.title || "Movie Poster"}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Row;




















import React, { useState, useEffect } from 'react';
import "./Styles/row.css";
import axios from "./axios";

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters"> {/* Add a container for the posters *//*}
            {movies && movies.length > 0 ? ( // Check if movies exists AND has data
              movies.map(movie => (
                  <img
                      key={movie.id || movie.poster_path || movie.backdrop_path} // Add a unique key!
                      className={`row__poster ${isLargeRow && "row__posterLarge"}`} // Add classes
                      src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                      alt={movie.name || movie.title || "Movie Poster"} // Provide a default alt
                  />
              ))
          ) : (
              <p>Loading...</p> // Or a suitable placeholder like a spinner
          )}
      </div>
  </div>
);
}

export default Row;


//original Row.js
import React,{useState, useEffect} from 'react';
import "./Styles/row.css";
import axios from "./axios";

function Row({title, fetchUrl, isLargeRow= false}) {
  const [movies, setMovies] = useState ([]); 

  const base_url = "https://image.tmdb.org/t/p/original/";
    
  useEffect (() => {
    async function fetchData(){

      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  },[fetchUrl]);
 
 
 
 

 
 
  return (
    <div className="row">
    <h2>{title}</h2>
    
    {movies.map(movie => (
      <img src = {`${base_url}${
        isLargeRow ? movie.poster_path : movie.backdrop_path
      }`}
      alt={movie.name}/>

    ))}




    </div>
  );
}

export default Row























*/