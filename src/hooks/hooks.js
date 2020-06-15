import { useState, useEffect, useContext } from "react";
import { API } from '../services/api-service';
import { TokenContext } from "../context";

function useFetch(method) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [token] = useCookies(['mr-token']);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError();
            const data = await API[method](token['mr-token'])
                .then(res => res.json())
                .catch(err => setError(err));
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, [method, token]);
    return [data, loading, error];
}
export { useFetch };
