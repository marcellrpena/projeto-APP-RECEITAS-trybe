import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';

function GoBackButton() {
  const history = useHistory();
  const { pathname } = useLocation();

  const toPreviousPage = () => {
    const type = pathname.includes('foods') ? 'foods' : 'drinks';
    const route = pathname.includes('in-progress')
      ? pathname.split('/in-progress')[0]
      : `/${type}`;
    history.push(route);
  };

  return (
    <button
      data-testid="go-back-btn"
      className="Go-Back-Btn"
      type="button"
      onClick={ toPreviousPage }
    >
      <IoIosArrowBack
        alt="Ícone de seta para o lado esquerdo"
        className="Go-Back-Btn"
      />
    </button>
  );
}

export default GoBackButton;
