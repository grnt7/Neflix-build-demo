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
            <div className="row-posters"> {/* Add a container for the posters */}
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



/*

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