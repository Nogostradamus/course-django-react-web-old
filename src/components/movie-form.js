import React, { useState } from 'react';
import {API} from "../services/api-service";

function MovieForm(props) {
    const [ title, setTitle ] = useState(props.movie.title)
    const [ description, setDescription ] = useState(props.movie.description)

    const cancelClicked = () => {
        props.cancelForm();
    }
    const saveClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify({title, description})
            }).then( resp => resp.json())
            .then( res => props.newMovie(res))
            .catch( error => console.log(error))
    }
    const updateClicked = () => {
        API.updateMovie(props.movie.id, {title, description})
            .then( resp => resp.json())
            .then( res => props.editedMovie(res))
            .catch( error => console.log(error))
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return (
        <React.Fragment>
            <span>Title</span><br/>
            <input type="text" name="title" value={title}
                onChange={evt => setTitle(evt.target.value)}/><br/>
            <span>Description</span><br/>
            <textarea name="description" value={description}
                onChange={evt => setDescription(evt.target.value)}/><br/>
            { props.movie.id ?
                <button disabled={isDisabled} onClick={updateClicked}>Update</button> :
                <button disabled={isDisabled} onClick={saveClicked}>Save</button> }
            &nbsp;
            <button onClick={cancelClicked}>Cancel</button>
        </React.Fragment>
    )
}

export default MovieForm;
