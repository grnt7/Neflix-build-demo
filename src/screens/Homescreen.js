import React from 'react'
import "../screens/Homescreen.css";
import Nav from '../Components/Nav';
import Banner from "../Components/Banner";
import requests from '../Components/Requests';
import Row from "../Components/Row";




function Homescreen() {
  return (
    <div className ="homescreen">
    <Nav/>
    <Banner/>
    <Row
    title="Netflix Originals" 
    fetchUrl={requests.fetchNetflixOriginals}
    isLargeRow/>
   
    <Row title ="Trending Now"fetchUrl={requests.fetchTrending} />
    <Row title ="Action  Movies"fetchUrl={requests.fetchActionMovies}/>
   
    <Row title ="Horror Movies"fetchUrl={requests.fetchHorrorMovies}/>
    <Row title ="Romance Movies"fetchUrl={requests.fetchRomanceMovies}/>
    <Row title ="Documentaries"fetchUrl={requests.fetchDocumentaries}/>
    
    </div>
  )
}

export default Homescreen;


