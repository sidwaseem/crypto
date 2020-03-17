import React, { useReducer } from 'react';
import {
    render,
    act,
    renderHook,
    initialState,
    reducer,
} from '../utils/test-utils';
import { appLoaded, fetchedData } from '../context/actions';
import App from '../components/app';
import Home from '../components/home';

const mockData = {
    data: [
        {
            id: 1,
            name: 'Bitcoin',
            symbol: 'BTC',
            slug: 'bitcoin',
            max_supply: 21000000,
            circulating_supply: 18268962,
            total_supply: 18268962,
            cmc_rank: 1,
            quote: {
                USD: {
                    price: 5417.56246824,
                    volume_24h: 76714328413.1832,
                    percent_change_1h: 5.96575,
                    percent_change_24h: -8.4708,
                    percent_change_7d: -40.4818,
                    market_cap: 98973242864.90277,
                    last_updated: '2020-03-13T20:19:43.000Z',
                },
            },
        },
    ],
};

describe('Suite:: <App /> component', () => {
    it('Should render `Loader` initially', () => {
        const { getByText } = render(<App />);
        expect(getByText(/Loading app/)).toBeInTheDocument();
    });

    it('Should render `App` if data is fetched', () => {
        let state;
        const newState = {
            ...initialState,
            cryptoData: mockData,
        };
        const { result } = renderHook(() => useReducer(reducer, newState));

        let [, dispatch] = result.current;

        act(() => {
            dispatch(fetchedData(mockData));
            dispatch(appLoaded());
        });

        [state, dispatch] = result.current;

        expect(state.appLoaded).toBeTruthy();
        expect(state.cryptoData.data).not.toBeNull();
    });
});
