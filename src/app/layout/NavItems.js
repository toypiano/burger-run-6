import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({ to, exact, children }) {
  return (
    <li className="NavItem">
      <NavLink to={to} exact={exact}>
        {children}
      </NavLink>
    </li>
  );
}

export default function NavItems() {
  return (
    <ul className="NavItems">
      <NavItem to="/" exact>
        BurgerBuilder
      </NavItem>
      <NavItem to="/orders" exact>
        Orders
      </NavItem>
      <NavItem to="/signout" exact>
        Sign Out
      </NavItem>
      <NavItem to="/auth" exact>
        Sign In
      </NavItem>
    </ul>
  );
}
