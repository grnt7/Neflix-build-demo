import React from 'react'
import "./Styles/Homescreen.css";
import Nav from './Nav';
import Banner from "./Banner";
import requests from './Requests';
import Row from "./Row";



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


/*
 <Row
    title="Netflix Originals" 
    fetchUrl={requests.fetchNetflixOriginals}
    isLargeRow/>
    <Row title ="Trending Now"fetchUrl={requests.fetchTrending} />
    <Row title ="Action  Movies"fetchUrl={requests.fetchActionMovies}/>
    <Row title ="Comedy Movies"fetchUrl={requests.fetchComedyMovies}/>
    <Row title ="Horror Movies"fetchUrl={requests.fetchHorrorMovies}/>
    <Row title ="Romamce Movies"fetchUrl={requests.fetchRomanceMovies}/>
    <Row title ="Documentaries"fetchUrl={requests.fetchDocumentaries}/>

     <Row title ="Comedy Movies"fetchUrl={requests.fetchComedyMovies}/>



*/