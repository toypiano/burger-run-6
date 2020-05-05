import React from 'react';
import MenuIcon from './MenuIcon';
import NavItems from './NavItems';

import { ReactComponent as Logo } from '../../common/images/a-w.svg';

export default function Navbar() {
  return (
    <div className="Navbar">
      <MenuIcon />
      <Logo className="Navbar__Logo" width="100" height="50" />
      <NavItems />
    </div>
  );
}
