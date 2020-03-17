import React, { Fragment, useState, useEffect } from 'react';
import fetchData from '../../utils/post';
import CONST from '../../const';

/**
 * Currency landing page
 * @function Details
 * @param {*} param0
 */
const Details = ({ location = { state: {} }, match }) => {
    const [currency, setCurrency] = useState(null);
    const { id, name } = location.state;

    useEffect(() => {
        const getDetails = () => {
            /*
                API FAQ: 
                https://coinmarketcap.com/api/faq/

                This CORS error means you are trying to make HTTP requests directly to the API from JavaScript
                in the client - side of your application which is not supported.
                This restriction is to protect API Key
            */
            const result = fetchData({
                url: `${CONST.localDetail}?q=${id}`,
            });
            result.then(res => setCurrency(res.data.data[id] || null));
        };
        getDetails();
    }, [id]);

    return (
        <div className="currency-details">
            {currency ? (
                <Fragment>
                    <div className="table-root">
                        <h2>
                            <img
                                src={currency.logo}
                                alt={currency.name}
                                className="img-text"
                            />
                            {name}
                        </h2>
                        <p>{currency.description}</p>
                    </div>
                    <div>
                        <ul className="crypto-links">
                            {Object.keys(currency.urls).map(u => {
                                return currency.urls[u].length ? (
                                    <li key={u}>
                                        <a
                                            href={currency.urls[u][0] || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {u}
                                        </a>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                </Fragment>
            ) : (
                <p>Nothing yet</p>
            )}
        </div>
    );
};
export default Details;
