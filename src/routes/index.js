import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';

import Navigation from '../components/navigation';
import Logo from '../img/generic.svg';
const Home = lazy(() => import('../components/home'));
const Currencies = lazy(() => import('../components/currencies'));
const Details = lazy(() => import('../components/details'));

const Routes = () => {
    return (
        <Suspense fallback={<span>Loading</span>}>
            <Router history={history}>
                <header className="app-header">
                    <h1 className="logo">
                        <img src={Logo} alt="Market Capitalization" />
                        Market Capitalization
                    </h1>
                    <Navigation />
                </header>
                <main className="app">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/latest" component={Currencies} />
                        <Route
                            path="/latest/:name"
                            render={props => <Details {...props} />}
                        />
                    </Switch>
                </main>
            </Router>
        </Suspense>
    );
};

export default Routes;
