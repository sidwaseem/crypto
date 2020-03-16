import React, { useState, useEffect } from 'react';
import CONST from '../../const';
import postCall from '../../utils/post';

const Currencies = ({ location = { state: {} }, match }) => {
    const [currency, setCurrency] = useState({});
    const { id, name } = location.state; // slug

    // console.log(location.state.id, match.params.name);
    useEffect(() => {
        const fetchData = async () => {
            // const result = await axios(CONST.detail}, {
            //     method: 'GET',
            //     // url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
            //     qs: {
            //         id: `1, ${id}`,
            //     },
            //     headers: {
            //         'X-CMC_PRO_API_KEY': 'e027cb66-32ce-40cd-8361-846402d8c3e5',
            //     },
            //     json: true,
            //     gzip: true,
            // });
            const result = postCall({
                url: CONST.localDetail,
            });
            setCurrency([result.data.data]);
        };
        fetchData();
    }, [id]);

    const curr = currency[0] && currency[0][id];

    return (
        <div>
            <h1>item: {name}</h1>
            {curr ? (
                <table>
                    <tbody>
                        <tr key={`curr-${curr.id}`}>
                            <td>
                                <img src={curr.logo} alt={curr.name} />
                            </td>
                            <td>
                                {curr.name} ({curr.symbol})
                            </td>
                            <td>{curr.description}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                '<p>Fetching data</p>'
            )}
        </div>
    );
};
export default Currencies;
