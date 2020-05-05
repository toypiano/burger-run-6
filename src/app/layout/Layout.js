import React, { useState } from 'react';
import Navbar from './Navbar';

import SideDrawer from './SideDrawer';

function Layout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="Layout">
      <Navbar openDrawer={() => setIsDrawerOpen(true)} />
      {isDrawerOpen && (
        <SideDrawer closeDrawer={() => setIsDrawerOpen(false)} />
      )}
      <main className="Layout__main">{children}</main>
    </div>
  );
}

export default Layout;
