import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory()
  console.log(history)

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const routeToUpdate = e =>{
    e.preventDefault();
    console.log('params in route function', match.params.id)
    history.push(`/update-movie/${match.params.id}`)
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      
      <button className='edit-button' onClick={routeToUpdate}>
        Edit
      </button>
    </div>
  );
}

export default Movie;
