import React, { useEffect, useReducer } from 'react';
import { StoreContext } from './provider';
import * as Actions from './actions';

import { initialState, reducer } from './reducer';
import getData from '../utils/post';
import CONST from '../const';

/**
 * Store provider
 * @function AppState
 * @param {*} props
 */
const AppState = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        /*
        API FAQ:
        https://coinmarketcap.com/api/faq/

        This CORS error means you are trying to make HTTP requests directly to the API from JavaScript
        in the client - side of your application which is not supported.
        This restriction is to protect API Key
    */
        getData({
            url: CONST.local,
        }).then(res => {
            dispatch(Actions.fetchedData(res.data));
            dispatch(Actions.appLoaded());
        });
    }, []);

    return (
        <StoreContext.Provider
            value={{
                appLoaded: state.appLoaded,
                cryptoData: state.cryptoData,
                dispatch,
            }}>
            {state.appLoaded ? props.children : <div>Loading app</div>}
        </StoreContext.Provider>
    );
};

export default AppState;
