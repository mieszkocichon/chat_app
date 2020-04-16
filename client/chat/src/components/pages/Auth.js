import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as AuthActions from '../../store/actions/accountActions';
import Login from '../partials/Login';
import SignUp from '../partials/Signup';

class Auth extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        {this.props.match.path === '/signup' ? <SignUp /> : <Login />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.account,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
