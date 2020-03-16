import React from 'react';
import { Link } from 'react-router-dom';
import DefaultIcon from '../../img/generic.svg';

/**
 * Render cells
 * @function getCellData
 * @param {Object} cell
 * @param {Object} currency
 */
function getCellData(cell, currency) {
    switch (cell.column.id) {
        case 'symbol': {
            return (
                <img
                    src={`https://cryptoicons.org/api/icon/${cell.value.toLowerCase()}/30`}
                    onError={e => {
                        e.target.src = DefaultIcon;
                    }}
                    alt={cell.value}
                />
            );
        }
        case 'name': {
            return (
                <Link
                    to={{
                        pathname: `/latest/${currency.slug}`,
                        state: {
                            slug: currency.slug,
                            id: currency.id,
                            name: cell.value,
                        },
                    }}>
                    {cell.value}
                </Link>
            );
        }
        case 'quote.USD.percent_change_24h': {
            return (
                <span
                    className={
                        cell.value.toString().indexOf('-') ? 'inc' : 'dec'
                    }>
                    {cell.value}
                </span>
            );
        }
        default: {
            return cell.render('Cell');
        }
    }
}

export default getCellData;
