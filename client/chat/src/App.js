import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ChatActions from './store/actions/chatActions';

import Auth from './components/pages/Auth';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./assets/css/swag.css";
import Messanger from './components/pages/Messanger';
require('bootstrap');

class App extends React.Component {

  componentDidMount() {
    this.props.setupSocket(this.props.token, this.props.user.id);
  }

  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <Switch>
            <Route path="/signup"
              render={props => {
                if (this.props.token) {
                  return (
                    <Redirect to="/" />
                  )
                }
                else {
                  return (
                    <Auth />
                  )
                }
              }}
            />
            <Route path="/login" 
              render={props => {
                if (this.props.token) {
                  return (
                    <Redirect to="/" />
                  )
                }
                else {
                  return (
                    <Auth />
                  )
                }
              }
            } />

            <Route path="/:threadId" render={props => 
              {
                if (!this.props.token) {
                  return (
                    <Redirect to="/login" />
                  )
                }
                else {
                  return (
                    <Messanger />
                  )
                }
              }
            } />

            <Route path="/" render={props => 
              {
                if (!this.props.token) {
                  return (
                    <Redirect to="/login" />
                  )
                }
                else {
                  return (
                    <Messanger />
                  )
                }
              }
            } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.account,
  ...state.chat
})

const mapDispatchToProps = dispatch => ({
  setupSocket: (token, userId) => {
    dispatch(ChatActions.setupSocket(token, userId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
