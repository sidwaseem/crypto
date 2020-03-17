import React, { useEffect, useReducer } from 'react';
import { StoreContext } from './provider';
import * as Actions from './actions';

import {
    initialState,
    reducer,
    // getCryptoData, // disabled due to api issue
    getCryptoDataLocally,
} from './reducer';

/**
 * Store provider
 * @function AppState
 * @param {*} props
 */
const AppState = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getCryptoDataLocally().then(res => {
            // getCryptoData().then(data => {
            dispatch(Actions.fetchedData(res.data));
            dispatch(Actions.appLoaded());
        });
    }, []);

    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {state.appLoaded ? props.children : <div>Loading app</div>}
        </StoreContext.Provider>
    );
};

export default AppState;
