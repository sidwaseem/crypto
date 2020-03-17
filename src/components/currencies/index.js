import React from 'react';
import { useTable, usePagination } from 'react-table';
import { useStore } from '../../context/provider';
import getCellData from './cellItem';
import CONST from '../../const';

/**
 * Prepare table
 * @param {Array} columns columns mapping
 * @param {Array} data data to be render into table
 * @param {Function} fetchData populate next page
 * @param {Boolean} loading indicator
 * @param {Number} pageCount page counter
 */
function Table({ columns, data, fetchData, pageCount: controlledPageCount }) {
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
            initialState: { pageIndex: 0 },
            manualPagination: true,
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
        <div className="table-container">
            <table {...getTableProps()} className="table-root">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {getCellData(
                                                cell,
                                                cell.row.original
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {getPagination(
                canPreviousPage,
                canNextPage,
                pageOptions,
                pageCount,
                gotoPage,
                nextPage,
                previousPage,
                setPageSize,
                pageIndex,
                pageSize
            )}
        </div>
    );
}

/**
 * Render Pagination
 * @function getPagination
 */
function getPagination(
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize
) {
    return (
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{' '}
            <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}>
                {'>>'}
            </button>{' '}
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
    );
}

/**
 * Render Currencies in a table format
 * @function Currencies
 * @param {Object} props
 */
const Currencies = props => {
    const state = useStore();
    const { cryptoData } = state;

    // We'll start our table without any data
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [pageCount, setPageCount] = React.useState(0);
    const fetchIdRef = React.useRef(0);

    // borrowed from React-table example
    const fetchData = React.useCallback(
        ({ pageSize, pageIndex }) => {
            // Give this fetch an ID
            const fetchId = ++fetchIdRef.current;
            // Set the loading state
            setLoading(true);

            // Only update the data if this is the latest fetch
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex;
                const endRow = startRow + pageSize;
                setData(cryptoData.slice(startRow, endRow));
                // set page count
                setPageCount(Math.ceil(cryptoData.length / pageSize));
                // hide loader
                setLoading(false);
            }
        },
        [cryptoData]
    );

    /**
     * @render
     */
    return (
        <Table
            columns={CONST.tableColumns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
        />
    );
};

export default Currencies;
