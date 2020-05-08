import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../app/ducks/auth';

export function SignOut({ logOut }) {
  useEffect(() => {
    logOut();
  }, [logOut]);
  return <Redirect to="/" />;
}

export default connect(null, actionCreators)(SignOut);
