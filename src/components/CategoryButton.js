import React from 'react';
import { func, string } from 'prop-types';

function CategoryButton({ categoryType, onClick, dataTestid }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ dataTestid }
    >
      {categoryType}
    </button>
  );
}
CategoryButton.defaultProps = { categoryType: '' };
CategoryButton.propTypes = {
  categoryType: string,
  onClick: func.isRequired,
  dataTestid: string.isRequired,
};
export default CategoryButton;
