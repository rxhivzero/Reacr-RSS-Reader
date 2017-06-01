import React, { PropTypes } from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ filter, RssData }) => {
    let rows = [];

    RssData.forEach((p) => {
        const titleLC = p.title.toLowerCase();
        const filterLC = filter.toLowerCase();

        if (titleLC.indexOf(filterLC) !== -1) {
            rows.push(
                <ProductRow key={p.title} data={p} />
            );
        }
    });

    return <div> {rows} </div>;
};

ProductTable.propTypes = {
    filter: PropTypes.string,
    RssData: PropTypes.array
};

export default ProductTable;
