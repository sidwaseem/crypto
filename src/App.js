import React from 'react';
import AppState from './context/appState';
import Item from './components/list';
import './App.css';
import Routes from './routes';

/**
 * Render markup
 * @returns {HTMLObject|JSX}
 */
const App = () => {
    return (
        <AppState>
            <div className="App">
                <header className="App-header">Market Capitalization</header>
                <Routes>
                    <main>
                        <Item />
                    </main>
                </Routes>
            </div>
        </AppState>
    );
};

export default App;
