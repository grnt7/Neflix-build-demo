import React, { useState, useEffect } from 'react';
import "./Styles/row.css";
import axios from "./axios";
import YouTube from 'react-youtube';


function Row({ title, fetchUrl, isLargeRow = true }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); // Track the selected movie
    const base_url = "https://image.tmdb.org/t/p/original/";

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
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        setSelectedMovie(movie);
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































/*
Gemini
import React, { useState, useEffect } from 'react';
import "./Styles/row.css";
import axios from "./axios";
import YouTube from 'react-youtube';

function Row({ title, fetchUrl, isLargeRow = true }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            const moviesWithTrailers = await Promise.all(
                request.data.results.map(async (movie) => {
                    try {
                        const videoRequest = await axios.get(
                            `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
                        );
                        const trailer = videoRequest.data.results.find(
                            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                        );
                        return {
                            ...movie,
                            trailerKey: trailer ? trailer.key : null,
                        };
                    } catch (error) {
                        console.error("Error fetching trailers:", error);
                        return { ...movie, trailerKey: null }; // Ensure all movie objects have trailerKey
                    }
                })
            );
            setMovies(moviesWithTrailers);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        setSelectedMovieId(movie.id);
        if (movie.trailerKey) {
            setTrailerUrl(movie.trailerKey);
        } else {
            setTrailerUrl("");
            alert("No Trailer Found");
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <img
                            key={movie.id}
                            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name || movie.title || "Movie Poster"}
                            onClick={() => handleClick(movie)}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {trailerUrl && selectedMovieId && (
                <div className="trailer-container">
                    <YouTube videoId={trailerUrl} opts={opts} />
                </div>
            )}
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