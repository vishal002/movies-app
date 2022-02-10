import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  // 
  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films')
  //   .then(response => response.json())
  //   .then(data => {
  //     const tranformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episonde_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     setMovies(tranformedMovies);
  //   })
  // }

  // another approach using async and await
  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films');
    const data = await response.json();
    const tranformedMovies = data.results.map(movieData => {
      return {
        id: movieData.episonde_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date
      }
    })
    setMovies(tranformedMovies);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
        { !isloading && movies.length > 0 && <MoviesList movies={movies} />}
        { !isloading && movies.length === 0 && <p>Found no movies</p>}
        { isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
