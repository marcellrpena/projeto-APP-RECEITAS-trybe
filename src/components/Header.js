import React from 'react';
import profileImage from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <head>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        {profileImage}
      </button>
      <title
        data-testid="page-title"
      >
        Foods
      </title>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        {searchIcon}
      </button>
    </head>
  );
}

export default Header;
