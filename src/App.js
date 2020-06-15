import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useFetch } from "./hooks/hooks";
import {TokenContext} from "./context";
var FontAwesome = require('react-fontawesome');

function App(props) {

  const { token, removeToken } = useContext(TokenContext);
  const [ moviesAPI, loadingMovies, errorMovies] = useFetch("loadMovies");
  const [ movies, setMovies ] = useState();
  const [ selectedMovie, setSelectedMovie ] = useState(null)
  const [ editedMovie, setEditedMovie ] = useState(null)

  useEffect(()=>{
    if(!token){
      window.location.href = '/';
    }
  },[token])

  useEffect(()=>{
    setMovies(moviesAPI)
  },[moviesAPI])

  const logoutClicked = () => {
    removeToken('mr-token');
    window.location.href = '/';
  }

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }
  const movieDeleted = selMovie => {
    const newMovies = movies.filter( movie => movie.id !== selMovie.id);
    setMovies(newMovies);
    setSelectedMovie(null);
  }
  const editClicked = selMovie => {
    setEditedMovie(selMovie);
  }
  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
  }
  const cancelForm = () => {
    setEditedMovie(null);
  }
  const addMovie = movie => {
    setMovies([...movies, movie]);
  }

  if(loadingMovies) return <h1>Loading...</h1>
  if(errorMovies) return <h1>Error loading movies</h1>

    return (
      <div className="App">
          <h1>
            <FontAwesome name="film"/>
            <span>Movie Rater</span>
            <button onClick={logoutClicked}>Logout</button>
          </h1>
          <div className="layout">
            <MovieList movies={movies} movieClicked={loadMovie} token={token}
              movieDeleted={movieDeleted} editClicked={editClicked} newMovie={newMovie}/>
            <div>
              { !editedMovie ?
                <MovieDetails movie={selectedMovie} updateMovie={loadMovie}  token={token}/>
               : <MovieForm movie={editedMovie} cancelForm={cancelForm}
               newMovie={addMovie} editedMovie={loadMovie} token={token}/> }
            </div>
            
          </div>
      </div>
    );
}

export default App;
