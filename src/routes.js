import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';

import Home from './components/home';
import Details from './components/details';
import Currencies from './components/currencies';
import Navigation from './components/navigation';

const Routes = () => {
    return (
        <div>
            <Router history={history}>
                <Navigation />
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/latest" component={Details} />
                        <Route
                            path="/latest/:name"
                            render={props => <Currencies {...props} />}
                        />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default Routes;
