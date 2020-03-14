import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import { useStore } from '../../context/provider';
import DefaultIcon from '../../img/generic.svg';

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination
    );

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize]);

    // Render the UI for your table
    return (
        <Fragment>
            <table {...getTableProps()} className="table-root">
                <thead className="MuiTableHead-root">
                    {headerGroups.map(headerGroup => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            className="MuiTableRow-root MuiTableRow-head">
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="table-root table-head">
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="MuiTableRow-root">
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="table-root table-body">
                                            {cell.column.id === 'symbol' ? (
                                                <img
                                                    src={`https://cryptoicons.org/api/icon/${cell.value.toLowerCase()}/30`}
                                                    onError={e => {
                                                        e.target.src = DefaultIcon;
                                                    }}
                                                    alt={cell.value}
                                                />
                                            ) : cell.column.id ===
                                              'quote.USD.percent_change_24h' ? (
                                                <span
                                                    className={
                                                        cell.value
                                                            .toString()
                                                            .indexOf('-')
                                                            ? 'inc'
                                                            : 'dec'
                                                    }>
                                                    {cell.value}
                                                </span>
                                            ) : (
                                                cell.render('Cell')
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    <tr>
                        {loading ? (
                            // Use our custom loading state to show a loading indicator
                            <td colSpan="10000">Loading...</td>
                        ) : (
                            <td colSpan="10000">
                                Showing {page.length} of ~
                                {controlledPageCount * pageSize} results
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}>
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </Fragment>
    );
}

const Item = props => {
    const [state] = useStore();
    const { cryptoData } = state;

    const columns = React.useMemo(
        () => [
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
        []
    );

    // We'll start our table without any data
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [pageCount, setPageCount] = React.useState(0);
    const fetchIdRef = React.useRef(0);

    const fetchData = React.useCallback(
        ({ pageSize, pageIndex }) => {
            // This will get called when the table needs new data
            // You could fetch your data from literally anywhere,
            // even a server. But for this example, we'll just fake it.

            // Give this fetch an ID
            const fetchId = ++fetchIdRef.current;

            // Set the loading state
            setLoading(true);

            // We'll even set a delay to simulate a server here
            setTimeout(() => {
                // Only update the data if this is the latest fetch
                if (fetchId === fetchIdRef.current) {
                    const startRow = pageSize * pageIndex;
                    const endRow = startRow + pageSize;
                    setData(cryptoData.data.slice(startRow, endRow));

                    // Your server could send back total page count.
                    // For now we'll just fake it, too
                    setPageCount(Math.ceil(cryptoData.data.length / pageSize));

                    setLoading(false);
                }
            }, 1000);
        },
        [cryptoData.data]
    );

    return (
        <Table
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
        />
    );
};

export default Item;
