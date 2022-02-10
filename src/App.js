import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

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
    }
    catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if(error) {
    content = <p>{error}</p>;
  }

  if (isloading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
        { content }
      </section>
    </React.Fragment>
  );
}

export default App;
