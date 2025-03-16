import React, {useState,useEffect} from  'react';
import "./Styles/Banner.css";
import axios from "./axios";
import requests from './Requests';
import YouTube from 'react-youtube';
import { auth } from '../firebase'; // Import your auth instance.

function Banner() {

    const  [movie, setMovie] = useState ([]);
    const [trailer, setTrailer] = useState(null);
      const [selectedMovie, setSelectedMovie] = useState(null); // Track the selected movie
       
         
    
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
      
      const handlePlay = async (id) => {
        if (trailer) {
            setTrailer(null);
        } else {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error('User is not logged in.');
                    return; // Or redirect to login
                }
                const token = await user.getIdToken();

                const response = await axios.get(
                    ` const base_url = "https://image.tmdb.org/t/p/original/";/getTrailer?id=${id}`, // Replace with your actual Cloud Function URL
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTrailer(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            }
        }
    };

      
 
       const handleClose = () => {
         setSelectedMovie(null); // Set selectedMovie to null to close
       }




      

      const opts = {
        height: "500px",
        width: "800px",
        playerVars: {
        autoplay: 1,
        },
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
            <button className="banner-button" onClick={() => handlePlay(movie.id)}>Play</button>
            <button className="banner-button">More Info</button>
        
        
        
        </div>
        {selectedMovie && selectedMovie.id === movie.id && movie.trailerKey && (
                                
                                <div className="banner-trailer-container">
                                     <button onClick={handleClose}>Close</button> {/* Add close button */}
                                    <YouTube videoId={movie.trailerKey} opts={opts} />
                                   
                                </div>
                            )}
                            {selectedMovie && selectedMovie.id === movie.id && !movie.trailerKey && (
                                <p>Trailer Not Found</p>
                              )}

                            
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





/* const handlePlay = async (id) => {
       if (trailer) {
        setTrailer(null);
       } else {
        const {data} = await axios.get(`functions/getTrailer?id=${id}`)
        setTrailer(data);
       }
      }
     

      const handleClose = () => {
        setSelectedMovie(null); // Set selectedMovie to null to close
      }





   const handlePlay = async (id) => {
        if (trailer) {
            setTrailer(null);
        } else {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error('User is not logged in.');
                    return; // Or redirect to login
                }
                const token = await user.getIdToken();

                const response = await axios.get(
                    ` const base_url = "https://image.tmdb.org/t/p/original/";/getTrailer?id=${id}`, // Replace with your actual Cloud Function URL
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTrailer(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            }
        }
    };






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