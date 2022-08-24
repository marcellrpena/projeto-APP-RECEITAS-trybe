import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../contexts/Contexts';

function CategoryButton({ categoryType }) {
  const [click, setClick] = useState(false);
  const { loadRecipes } = useContext(RecipesContext);

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    if (click) loadRecipes();
  }, [click]);

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
