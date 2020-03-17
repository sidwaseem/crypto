import React from 'react';
import AppState from '../context/appState';
import Routes from '../routes';
import './app.css';

/**
 * Render markup
 * @returns {HTMLObject|JSX}
 */
const App = props => {
    return (
        <AppState {...props}>
            <Routes {...props} />
        </AppState>
    );
};

export default App;
