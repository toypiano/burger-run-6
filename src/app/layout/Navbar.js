import React from 'react';
import MenuIcon from './MenuIcon';
import NavItems from './NavItems';

import { ReactComponent as Logo } from '../../common/images/a-w.svg';

export default function Navbar({ openDrawer }) {
  return (
    <div className="Navbar">
      <MenuIcon handleClick={openDrawer} />
      <Logo className="Navbar__Logo" />
      <NavItems />
    </div>
  );
}
