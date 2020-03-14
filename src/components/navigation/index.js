import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <Link to="/" style={{ padding: '5px' }}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/latest" style={{ padding: '5px' }}>
                        Latest
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
