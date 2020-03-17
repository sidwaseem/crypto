import React, { useReducer } from 'react';
import {
    render,
    act,
    renderHook,
    initialState,
    reducer,
} from '../utils/test-utils';
import { appLoaded, fetchedData } from '../context/actions';
import getData from '../utils/post';
import App from '../components/app';
// import Home from '../components/home';

jest.mock('../utils/post');

afterEach(() => {
    getData.mockReset();
});

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
    // https://github.com/threepointone/react-act-examples/blob/master/sync.md
    getData.mockResolvedValue(mockData);

    it('Should render `Loader` initially', () => {
        const { getByText } = render(<App />);
        expect(getByText(/Loading app/)).toBeInTheDocument();
    });

    it('Should render `App` if data is fetched', () => {
        let state;
        // const newState = {
        //     ...initialState,
        // };

        act(() => {
            const { result } = renderHook(() => useReducer(reducer, {}));
            let [, dispatch] = result.current;
            const { container } = render(<App />, {
                route: '/',
            });
            dispatch(fetchedData());
            dispatch(appLoaded());
        });

        // [state, dispatch] = result.current;

        expect(state.appLoaded).toBeTruthy();
        expect(state.cryptoData).not.toBeNull();

        expect(container.innerHTML).toMatch('No match');

        // expect(container.querySelector('.app-header')).toHaveLength(1);

        // fireEvent.click(getByText('Change Text'));

        // expect(getByText(/Some/i).textContent).toBe('Some Other Text');
    });
});
