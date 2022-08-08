import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


// 91a77b30 (api key)


// movies api
const API_URL = ' http://www.omdbapi.com/?apikey=91a77b30'

// const movie1 = {
//   "Title": "Spiderman in Cannes",
//   "Year": "2016",
//   "imdbID": "tt5978586",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg"
// };


const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input placeholder='Search for movies' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}/>

        <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)}/>
      </div>

      {/* ternary operator to iterate over movies object to display movies
        if movies length is greater then 0, if not display "No movies found." */}

      {movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>  
  );
}

export default App;
