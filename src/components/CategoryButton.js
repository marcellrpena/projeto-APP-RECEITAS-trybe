import React from 'react';

function CategoryButton({ categoryType }) {
  const handleClick = () => {
    console.log('asd');
  };

  return (
    <button
      type="button"
      data-testid={ `${categoryType}-category-filter` }
      onClick={ handleClick }
    >
      {categoryType}
    </button>
  );
}

CategoryButton.defaultProps = { categoryType: '' };
CategoryButton.propTypes = { categoryType: string };

export default CategoryButton;
