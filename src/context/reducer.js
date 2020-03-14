import rawData from '../data/mockData.json';
import { actionTypes } from './actions';

export const initialState = {
    appLoaded: false,
    cryptoData: [],
};

const cryptoUrl =
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=d11eb0a4-dbf8-4c98-8b65-87af8a4031c9';
/**
 * Fetch latest crypto stats data
 */
export const getCryptoData = () => {
    return fetch(cryptoUrl)
        .then(r => r.json())
        .then(({ data }) => data);
};

/**
 * Helper method to Mimic crypto stats updates locally to avoid unnecassary calls to API
 * @function getCryptoDataLocally
 */
export const getCryptoDataLocally = () => {
    return new Promise(resolve => resolve(rawData));
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
