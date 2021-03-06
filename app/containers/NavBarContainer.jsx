import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { logout } from '../reducers/auth';

const mapStateToProps = state => {
  return {
      user: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout () {
      return dispatch(logout());
    }

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

