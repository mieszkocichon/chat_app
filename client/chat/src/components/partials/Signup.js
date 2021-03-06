import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordAgain: '',
      name: '',
      username: '',
      error: '',
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form-wrapper">
              <h3>SignUp</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  this.props.loginErrorClean();
                  this.props.loginInfoClean();

                  if (this.props.socket) {
                    let empty = 0;
                    Object.keys(this.state).map((key) => {
                      if (key !== 'error' && this.state[key] === '') {
                        empty += 1;
                      }
                    });

                    if (empty > 0) {
                      return this.setState({ error: 'All Fields Required' });
                    } else {
                      if (this.state.password !== this.state.passwordAgain) {
                        return this.setState({
                          error: 'Passwords Must Match ',
                        });
                      }
                    }

                    this.props.socket.send(
                      JSON.stringify({
                        type: 'SIGNUP',
                        data: {
                          email: this.state.email,
                          password: this.state.password,
                          name: this.state.name,
                          username: this.state.username,
                        },
                      })
                    );
                  }
                }}
              >
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
                {this.props.signup_error && this.props.signup_error.message ? (
                  <p className="text-danger">User already exists</p>
                ) : null}
                {this.props.signup_info && this.props.signup_info.message ? (
                  <p className="text-success siggned-success">You are siggned up now.</p>
                ) : null}
                {this.state.error ? (
                  <p className="text-danger">{this.state.error}</p>
                ) : null}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="name"
                        className="form-control signup-name"
                        placeholder="Name"
                        value={this.state.name}
                        required
                        min="2"
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="name"
                        className="form-control signup-username"
                        placeholder="Name"
                        value={this.state.username}
                        required
                        min="2"
                        onChange={(e) =>
                          this.setState({ username: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control signup-email"
                        placeholder="Email"
                        value={this.state.email}
                        required
                        min="6"
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control signup-password-first"
                        placeholder="Password"
                        value={this.state.password}
                        required
                        min="3"
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password again</label>
                      <input
                        type="password"
                        className="form-control signup-password-second"
                        placeholder="Password (Again)"
                        value={this.state.passwordAgain}
                        required
                        min="3"
                        onChange={(e) =>
                          this.setState({ passwordAgain: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">
                  Sign up!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.account,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  loginErrorClean: () => {
    dispatch({
      type: 'SIGNUP_ERROR',
      payload: null,
    })
  },
  loginInfoClean: () => {
    dispatch({
      type: 'SIGNUP_INFO',
      payload: null,
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
