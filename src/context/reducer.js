import { actionTypes } from './actions';
import CONST from '../const';
import postCall from '../utils/post';

export const initialState = {
    appLoaded: false,
    cryptoData: [],
};

/**
 * Fetch latest crypto stats data
 */
export const getCryptoData = () => {
    return (
        postCall({
            url: CONST.url,
            method: 'POST',
            headers: {
                'X-CMC_PRO_API_KEY': process.env.REACT_APP_API_KEY || '',
            },
        })
            // .then(r => r.json())
            .then(res => {
                console.log(res);
                return res.data.data;
            })
            .catch(err => console.log(err))
    );
};
// export const getCryptoData = () => {
//     return fetch(CONST.url, {
//         mode: 'cors',
//         headers: {
//             'X-CMC_PRO_API_KEY': 'e027cb66-32ce-40cd-8361-846402d8c3e5',
//             'X-CSRF-TOKEN': document
//                 .querySelector('meta[name="csrf-token"]')
//                 .getAttribute('content'),
//         },
//     })
//         .then(r => r.json())
//         .then(({ data }) => data);
// };

/**
 * Helper method to Mimic crypto stats updates locally to avoid unnecassary calls to API
 * @function getCryptoDataLocally
 */
export const getCryptoDataLocally = () => {
    return postCall({
        url: CONST.local,
    });
};

/**
 * Reducer function to manage states
 * @function Reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} state object
 */
export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.APPLOADED:
            return {
                ...state,
                appLoaded: true,
            };

        case actionTypes.DATA_FETCHED:
            return {
                ...state,
                cryptoData: action.payload,
            };

        default:
            return state;
    }
};
