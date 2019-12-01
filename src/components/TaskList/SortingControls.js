import React from 'react';
import PropTypes from 'prop-types';
import './sortingControls.css';

const SortingControls = ({sortOptions, onFieldChange, onDirectionChange}) => {
    return (
        <div className='sortingControls'>
            <label>
                Sort by:
                <select value={sortOptions.sort_field} onChange={onFieldChange}>
                    <option value='id'>id</option>
                    <option value='username'>username</option>
                    <option value='email'>email</option>
                    <option value='status'>status</option>
                </select>
            </label>
            <label>
                Sort direction:
                <select value={sortOptions.sort_direction} onChange={onDirectionChange}>
                    <option value='asc'>asc</option>
                    <option value='desc'>desc</option>
                </select>
            </label>
        </div>
    )
};

SortingControls.propTypes = {
    sortOptions: PropTypes.object,
    onDirectionChange: PropTypes.func,
    onFieldChange: PropTypes.func
}

export default SortingControls;