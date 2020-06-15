import React, {useState, useContext, useEffect} from 'react';
import { TokenContext } from "../context";

function Login(props) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoginView, setIsLoginView ] = useState(true);

    //const { token, setToken } = useContext(TokenContext);

    /*HERE*/
    const [token, setToken] = useCookies(['mr-token']);
    setToken('mr-token',resp.token))

    useEffect(()=>{
        console.log('token',token)
        //if(token['mr-token']) window.location.href = '/movies';
        if(token) window.location.href = '/movies';
    },[token])

    const login = event => {
        if(isLoginView) {
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
                }).then( resp => resp.json())
                .then( res => {
                    console.log(res.token);
                    props.cookies.set('mr-token', res.token);
                    setToken('mr-token', res.token);
                    window.location.href = "/movies";
                })
                .catch( error => console.log(error))
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
                }).then( resp => resp.json())
                .then( res => {
                    setIsLoginView(true);
                })
                .catch( error => console.log(error))
        }
    }
    const toggleView = () => {
        setIsLoginView(!isLoginView);
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return (
        <div className="login-container">
        <h1>
            { isLoginView ? 'Login' : 'Register'}
        </h1>
        <span>Username</span><br/>
        <input type="text" name="username" value={username}
            onChange={evt => setUsername(evt.target.value)}/><br/>
        <span>Password</span><br/>
            <input type="password" name="password" value={password}
                onChange={evt => setPassword(evt.target.value)}/><br/>
        <button onClick={login} disabled={isDisabled}>
            { isLoginView ? 'Login' : 'Register'}
        </button>
        <p onClick={toggleView}>
            { isLoginView ? 'Create Account' : 'back to login'}
        </p>
    </div>
    )
}

export default Login;
