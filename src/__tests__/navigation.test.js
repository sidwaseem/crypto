import React from 'react';
import { render } from '../utils/test-utils';
import Navigation from '../components/Navigation';

describe('Suite:: <Navigation /> component', () => {
    it('Should render component without crashing', () => {
        const { container } = render(<Navigation />);
        expect(container.querySelector('.navigation')).toBeInTheDocument();
    });
});
