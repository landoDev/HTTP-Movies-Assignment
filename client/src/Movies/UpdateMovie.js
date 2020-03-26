import React, { useState, useEffect } from 'react';
import { useParams , useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = props =>{
    const [stars, setStars] = useState(false)
    const [movie, setMovie] = useState({
        id: NaN,
        title: '',
        director: '',
        metascore: NaN,
        stars: []
    });

    const {id} = useParams()
    const history = useHistory();

    const handleInputs = e =>{
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    // const addStars = e => {
    //     e.preventDefault();
    //     setMovie({
    //         ...movie,
    //         stars: movie.stars.split(',')
    //     });
    //     setStars(true)
    //   };

    useEffect(()=>{
        const movieToUpdate = props.movieList.find(e => `${e.id}` === id);
        if(movieToUpdate) {
            setMovie(movieToUpdate)
        }
    },[props.movieList, id])

    const handleUpdate = e =>{
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res=>{
            console.log(res)
            // props.setMovieList(res.data)
            props.setMovieList.map(item=>{
                if(`${movie.id} === ${res.data.id}`){
                    return item
                } else {
                    return movie
                }
            })
        })
        .catch(err=>{
            console.log('D\'\OH', err)
        })
        setMovie('');
        history.push(`/movies/${movie.id}`)
    }
    //if time, add a function with an alert that pops up and keeps people from editing star wars
    return(
        <form onSubmit={handleUpdate}>
            <label>Edit Title</label>
            <input name='title' onChange={handleInputs} value={movie.title}></input>

            <label>Edit Director</label>
            <input name='director' onChange={handleInputs} value={movie.director}></input>

            <label>Edit Metascore</label>
            <input type='number' name='metascore' onChange={handleInputs} value={movie.metascore}></input>
{/* 
            <label name='stars' onClick={addStars}>Add Star
            <input name = 'stars' placeholder='Add a Star'></input>
            </label> */}

            <button>Update Movie</button>
        </form>
    )
}

export default UpdateMovie