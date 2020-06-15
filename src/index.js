import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/login';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
//import { useCookies } from 'react-cookie';
import { TokenContext } from "./context";


function Router(){
    // 2bf9b12a51921fbc3b3c68622e100a4b064296ff
    const { token, setToken, removeToken } = useState(['2bf9b12a51921fbc3b3c68622e100a4b064296ff']);
    //const [token, setToken, removeToken] = useCookies(['mr-token']);

    return (
        <TokenContext.Provider value={{token, setToken, removeToken}}>
            <BrowserRouter>
                <Route exact path="/" component={Login} />
                <Route exact path="/movies" component={App} />
            </BrowserRouter>
        </TokenContext.Provider>
    )
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
