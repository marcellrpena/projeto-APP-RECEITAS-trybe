import { string, func } from 'prop-types';
import React from 'react';

function Button({ text, dataTestid, onClick, name }) {
  return (
    <button
      name={ name }
      type="button"
      onClick={ onClick }
      data-testid={ dataTestid }
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  dataTestid: string,
  onClick: func,
  text: string,
}.isRequired;

export default Button;
