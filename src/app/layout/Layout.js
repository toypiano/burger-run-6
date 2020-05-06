import React, { useState } from 'react';
import Navbar from './Navbar';

import SideDrawer from './SideDrawer';

function Layout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="Layout">
      <Navbar openDrawer={openDrawer} />
      <SideDrawer
        isOpen={isDrawerOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <main className="Layout__main">{children}</main>
    </div>
  );
}

export default Layout;
