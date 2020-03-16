import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navigation component
 * @function Navigation
 */
const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <NavLink to="/" exact activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/latest" exact activeClassName="active">
                        Latest
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
