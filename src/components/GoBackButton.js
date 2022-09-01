import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

function GoBackButton() {
  const history = useHistory();
  return (
    <IoIosArrowBack className="Go-Back-Btn" onClick={ () => history.goBack() } />
  );
}

export default GoBackButton;
