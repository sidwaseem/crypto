import { actionTypes } from './actions';
import CONST from '../const';
import fetchData from '../utils/post';

export const initialState = {
    appLoaded: false,
    cryptoData: [],
};

/**
 * Fetch latest crypto stats data
 */
export const getCryptoData = () => {
    return fetchData({
        url: CONST.url,
    })
        .then(res => {
            return res.data.data;
        })
        .catch(err => console.log(err));
};

/**
 * Helper method to Mimic crypto stats updates locally to avoid unnecassary calls to API
 * @function getCryptoDataLocally
 */
export const getCryptoDataLocally = () => {
    /*
        API FAQ: 
        https://coinmarketcap.com/api/faq/

        This CORS error means you are trying to make HTTP requests directly to the API from JavaScript
        in the client - side of your application which is not supported.
        This restriction is to protect API Key
    */
    return fetchData({
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
