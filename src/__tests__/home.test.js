import React from 'react';
import { render } from '../utils/test-utils';
import Home from '../components/home';

describe('Suite:: <Home /> component', () => {
    it('Should render component without crashing', () => {
        const { container } = render(<Home />);
        expect(container.querySelector('.banner')).toBeInTheDocument();
    });
});
