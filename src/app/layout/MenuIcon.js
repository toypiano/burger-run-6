import React from 'react';

export default function MenuIcon({ handleClick }) {
  return (
    <button type="button" className="MenuIcon" onClick={handleClick}>
      <div className="hamburger" />
    </button>
  );
}
