import axios from 'axios';

const fetchData = options => {
    return axios({
        url: options.url,
        method: options.method || 'GET',
        headers: {
            'X-CMC_PRO_API_KEY': process.env.REACT_APP_SANDBOX_API_KEY,
            'content-type': 'application/json',
            'access-control-allow-origin': '*',
            'cache-control': 'no-cache',
        },
        withCredentials: true,
    });
};

export default fetchData;
