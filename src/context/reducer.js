import { actionTypes } from './actions';

export const initialState = {
    appLoaded: false,
    cryptoData: [],
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
