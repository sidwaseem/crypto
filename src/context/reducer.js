import rawData from '../data/mockData.json';
import { actionTypes } from './actions';
import CONST from '../const';

export const initialState = {
    appLoaded: false,
    cryptoData: [],
};

/**
 * Fetch latest crypto stats data
 */
export const getCryptoData = () => {
    return fetch(CONST.url, {
        mode: 'cors',
        headers: {
            'X-CMC_PRO_API_KEY': 'e027cb66-32ce-40cd-8361-846402d8c3e5',
            'X-CSRF-TOKEN': document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute('content'),
        },
    })
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
