import React from 'react';
import { Link } from 'react-router-dom';
import DefaultIcon from '../../img/generic.svg';

function getCellData(cell) {
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
            return <Link to={`/latest/${cell.value}`}>{cell.value}</Link>;
        }
        case 'quote.USD.percent_change_24h': {
            return (
                <span
                    className={
                        cell.value.toString().indexOf('-') ? 'inc' : 'dec'
                    }></span>
            );
        }
        default: {
            return cell.render('Cell');
        }
    }
}

export default getCellData;
