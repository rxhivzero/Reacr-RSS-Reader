import React, { PropTypes } from 'react';
import { link } from '../styles/filterableTable.scss';

const ProductRow = ({ data }) =>
    <div>
        <a className={link} href={data.link} target="_blank">{data.title}</a>
    </div>;

ProductRow.propTypes = {
    data: PropTypes.object
};

export default ProductRow;
