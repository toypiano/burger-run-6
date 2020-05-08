import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function NavItem({ to, exact, children }) {
  return (
    <li className="NavItem">
      <NavLink to={to} exact={exact}>
        {children}
      </NavLink>
    </li>
  );
}

export function NavItems({ isAuthenticated }) {
  return (
    <ul className="NavItems">
      <NavItem to="/" exact>
        BurgerBuilder
      </NavItem>
      <NavItem to="/orders" exact>
        Orders
      </NavItem>
      {isAuthenticated ? (
        <NavItem to="/signout" exact>
          Sign Out
        </NavItem>
      ) : (
        <NavItem to="/auth" exact>
          Sign In
        </NavItem>
      )}
    </ul>
  );
}

const mapState = (state) => {
  const {
    auth: { idToken },
  } = state;
  return { isAuthenticated: idToken !== null };
};
export default connect(mapState)(NavItems);
