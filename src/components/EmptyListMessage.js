import React from 'react';
import '../styles/RecipesList.css';

function EmptyListMessage() {
  return (
    <div className="Empty-Message-Container">
      <h4>You do not have any recipe here yet, start adding some!</h4>
    </div>
  );
}

export default EmptyListMessage;
