import React from 'react';
import Backdrop from '../../common/ui/Backdrop';
import NavItems from './NavItems';

export default function SideDrawer({ isOpen, closeDrawer }) {
  return (
    <div className="SideDrawer">
      <Backdrop show={isOpen} handleClick={closeDrawer} />
      <nav className={isOpen ? 'open' : null}>
        <NavItems />
      </nav>
    </div>
  );
}
