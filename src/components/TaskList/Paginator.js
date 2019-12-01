import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {useSelector} from 'react-redux'
import './paginator.css';

const Paginator = ({onChange}) => {
    const totalPages = useSelector((state) => state.tasks.get('total')/3);

    return (
        <ReactPaginate marginPagesDisplayed={2}
                       pageRangeDisplayed={3}
                       onPageChange={onChange}
                       containerClassName={'pagination'}
                       activeClassName={'active'}
                       pageCount={totalPages}/>
    );
}

Paginator.propTypes = {
    onChange: PropTypes.func
}

export default React.memo(Paginator);