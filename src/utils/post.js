import axios from 'axios';

const getData = options => {
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
    })
        .then(res => res.data)
        .catch(err => console.log(err));
};

// /**
//  * Fetch latest crypto stats data
//  */
// export const getCryptoData = () => {
//     return fetchData({
//         url: CONST.url,
//     })
//         .then(res => {
//             return res.data.data;
//         })
//         .catch(err => console.log(err));
// };

// /**
//  * Helper method to Mimic crypto stats updates locally to avoid unnecassary calls to API
//  * @function getCryptoDataLocally
//  */
// export const getCryptoDataLocally = () => {
//     /*
//         API FAQ:
//         https://coinmarketcap.com/api/faq/

//         This CORS error means you are trying to make HTTP requests directly to the API from JavaScript
//         in the client - side of your application which is not supported.
//         This restriction is to protect API Key
//     */
//     return fetchData({
//         url: CONST.local,
//     });
// };

export default getData;
