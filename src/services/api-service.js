const BASE_URL = 'http://127.0.0.1:8000';

export class API {
    static loadMovies(token) {
        return fetch(`${BASE_URL}/api/movies/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }
    static updateMovie(token, id, data) {
        return fetch(`${BASE_URL}/api/movies/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(data)
        })
    }
}

