import React from 'react';

export default function MenuIcon({ handleClick }) {
  return (
    <div className="MenuIcon" onClick={handleClick}>
      <div className="MenuIcon__line" />
      <div className="MenuIcon__line" />
      <div className="MenuIcon__line" />
    </div>
  );
}
