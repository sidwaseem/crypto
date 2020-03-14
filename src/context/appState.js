import React, { useEffect, useReducer } from 'react';
import { StoreContext } from './provider';
import * as Actions from './actions';

import {
    initialState,
    reducer,
    // getCryptoData,
    getCryptoDataLocally, // uncomment line to use local data
} from './reducer';

const AppState = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getCryptoDataLocally().then(data => {
            dispatch(Actions.fetchedData(data));
            dispatch(Actions.appLoaded());
        });
    }, []);

    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {state.appLoaded ? props.children : <div>Fetching crypto data</div>}
        </StoreContext.Provider>
    );
};

export default AppState;
