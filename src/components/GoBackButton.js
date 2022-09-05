import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useLocation, useParams } from 'react-router-dom';

function GoBackButton() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();

  const toPreviousPage = () => {
    const route = pathname.includes('in-progress')
      ? pathname.split('/in-progress')[0]
      : pathname.split(`/${id}`)[0];
    history.push(route);
  };

  return (
    <button
      data-testid="go-back-btn"
      className="Go-Back-Btn"
      type="button"
      onClick={ toPreviousPage }
    >
      <IoIosArrowBack className="Go-Back-Btn" />
    </button>
  );
}

export default GoBackButton;
