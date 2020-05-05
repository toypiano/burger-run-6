import React from 'react';
import Backdrop from '../../common/ui/Backdrop';
import NavItems from './NavItems';

export default function SideDrawer() {
  return (
    <div className="SideDrawer">
      <Backdrop />
      <nav>
        <NavItems />
      </nav>
    </div>
  );
}
