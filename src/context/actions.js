export const actionTypes = {
    APPLOADED: 'APPLOADED',
    DATA_FETCHED: 'DATA_FETCHED',
};

/**
 * Update app state
 * @function appLoaded
 */
export const appLoaded = () => ({
    type: actionTypes.APPLOADED,
});

/**
 * Dispatch action to update new rates
 * @function fetchData
 * @param {Object} data object
 */
export const fetchedData = data => ({
    type: actionTypes.DATA_FETCHED,
    payload: data,
});
