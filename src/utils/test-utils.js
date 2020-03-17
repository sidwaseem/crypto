import React, { useReducer } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render as rtlRender, cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import { StoreContext } from '../context/provider';
import { actionTypes, initialState, reducer } from '../context/reducer';

afterEach(cleanup);

function render(ui, { store = {}, ...options } = {}) {
    function Wrapper(props) {
        const appState = Object.assign({}, initialState, store);
        const [state, dispatch] = useReducer(reducer, appState);
        return (
            <MemoryRouter initialEntries={['/']}>
                <StoreContext.Provider
                    value={{
                        appLoaded: state.appLoaded,
                        cryptoData: state.cryptoData,
                        dispatch,
                    }}
                    {...props}>
                    {props.children}
                </StoreContext.Provider>
            </MemoryRouter>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';
export * from '@testing-library/react-hooks';
export * from '@testing-library/jest-dom';

// override render method
export { render, renderHook, act, actionTypes, initialState, reducer };
