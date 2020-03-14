import { createContext, useContext } from 'react';
import { initialState } from './reducer';

const StoreContext = createContext(initialState);

function useStore() {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error('Cannot use `useStore` outside of a StoreProvider ');
    }
    return store;
}

// const { Provider } = StoreContext;
export { StoreContext, useStore };
