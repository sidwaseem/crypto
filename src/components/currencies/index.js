import React, { useState, useEffect } from 'react';
import CONST from '../../const';

const Currencies = ({ name }) => {
    useEffect(() => {
        fetchItem();
        // console.log(name);
    }, [fetchItem, name]); // disable autofix, remove fetchItem

    const [item, setItem] = useState({});

    const fetchItem = async () => {
        const fetchItem = await fetch('/data/mockDetails.json', {
            //CONST.detail
            qs: {
                // id: 1027,
                slug: name,
            },
            headers: {
                'X-CMC_PRO_API_KEY': 'd11eb0a4-dbf8-4c98-8b65-87af8a4031c9',
                'Access-Control-Allow-Origin': window.location.origin,
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const item = await fetchItem.json();
        // console.log(item.data['1027']);
        setItem(item.data['1027']);
    };

    return (
        <div>
            <h1>item: {name}</h1>
        </div>
    );
};
export default Currencies;
