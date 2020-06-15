import React, { useState } from 'react';
var FontAwesome = require('react-fontawesome');

function MovieDetails(props){

    const [highlighted, setHighlighted] = useState(-1)
    const mov = props.movie;

    const highlightRate = high => evt => {
        setHighlighted(high);
    }
    const rateClicked = stars => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify({stars: stars + 1})
            }).then( resp => resp.json())
            .then( res => getDetails())
            .catch( error => console.log(error))
    }
    const getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
            }).then( resp => resp.json())
            .then( res => props.updateMovie(res))
            .catch( error => console.log(error))
    }

    return (
        <React.Fragment>
            { mov ? (
                <div>
                    <h3>{mov.title}</h3>
                    <FontAwesome name="star" className={mov.avg_rating > 0 ? 'orange': ''}/>
                    <FontAwesome name="star" className={mov.avg_rating > 1 ? 'orange': ''}/>
                    <FontAwesome name="star" className={mov.avg_rating > 2 ? 'orange': ''}/>
                    <FontAwesome name="star" className={mov.avg_rating > 3 ? 'orange': ''}/>
                    <FontAwesome name="star" className={mov.avg_rating > 4 ? 'orange': ''}/>
                    ({mov.no_of_ratings})
                    <p>{mov.description}</p>

                    <div className="rate-container">
                        <h2>Rate it !!!</h2>
                        { [...Array(5)].map( (e, i) => {
                            return <FontAwesome key={i} name="star" className={highlighted > i - 1 ? 'purple': ''}
                                onMouseEnter={highlightRate(i)} onMouseLeave={highlightRate(-1)} onClick={rateClicked(i)}/>
                        })}
                    </div>
                </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieDetails;
