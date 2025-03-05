import React, {useState,useEffect} from  'react';
import "./Styles/Banner.css";
import axios from "./axios";
import requests from './Requests';


function Banner() {

    const  [movie, setMovie] = useState ([]);
    
    useEffect(() => { 
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results
                [Math.floor(Math.random() * request.data.results.length-1)
                ]
            );
          return request;
        }
        fetchData();
        }, [])
    console.log(movie);



    const [isExpanded, setIsExpanded] = useState(false);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n-1) + "..." : string;
    };

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
      };

    
    return (
    <header className="banner" 
        style={{
        backgroundSize:"cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
    }}>
        <div className="banner-contents">
            <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="banner-buttons">
            <button className="banner-button">Play</button>
            <button className="banner-button">My List</button>
        </div>
            
        </div>
        <h1 className="banner-description"> 
        {isExpanded ? movie?.overview : truncate(movie?.overview, 150)}
        {movie?.overview?.length > 150 && (
          <button onClick={toggleExpansion} className="read-more-button">
            {isExpanded ? "Show less" : " Read More"}
           
          </button>
        )}
             </h1>
        <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner;





/*
isExpanded

const [isExpanded, setIsExpanded] = useState(false);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="banner-contents">
      <h1 className="banner-title">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <div>
        <button className="banner-button">Play</button>
        <button className="banner-button">My List</button>
      </div>
      <h1 className="banner-description">
        {isExpanded ? movie?.overview : truncate(movie?.overview, 150)}
        {movie?.overview?.length > 150 && (
          <button onClick={toggleExpansion} className="read-more-button">
            {isExpanded ? " Show Less" : " Read More"}
          </button>
        )}
      </h1>
    </div>







*/