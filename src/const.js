export default {
    local: '/data/mockData.json',
    localDetail: '/data/mockDetails.json',
    // urlSandbox:
    //     'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    // detailSandbox:
    //     'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/info',
    // url:
    //     'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=d11eb0a4-dbf8-4c98-8b65-87af8a4031c9',
    // detail: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
    tableColumns: [
        {
            Header: '#',
            accessor: 'id',
        },
        {
            Header: 'Symbol',
            accessor: 'symbol',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Market Cap',
            accessor: 'quote.USD.market_cap',
        },
        {
            Header: 'Price',
            accessor: 'quote.USD.price',
        },
        {
            Header: 'Volume (24H)',
            accessor: 'quote.USD.volume_24h',
        },
        {
            Header: 'Circulating Supply',
            accessor: 'circulating_supply',
        },
        {
            Header: 'Change (24H)',
            accessor: 'quote.USD.percent_change_24h',
        },
    ],
};
