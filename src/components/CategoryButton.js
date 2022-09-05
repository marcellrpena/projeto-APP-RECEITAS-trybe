import { func, string } from 'prop-types';
import React from 'react';

function CategoryButton({ categoryType, onClick }) {
  return (
    <button
      className="filter-btn"
      type="button"
      data-testid={ `${categoryType}-category-filter` }
      onClick={ onClick }
    >
      {categoryType}
    </button>
  );
}

CategoryButton.defaultProps = { categoryType: '' };
CategoryButton.propTypes = {
  categoryType: string,
  onClick: func.isRequired,
};

export default CategoryButton;
