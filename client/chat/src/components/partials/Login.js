import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form-wrapper">
              <h3>Login</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (!this.state['email']) {
                    return this.setState({
                      error: 'Email is needed',
                    })
                  }

                  if (!this.state['password']) {
                    return this.setState({
                      error: 'Password is needed',
                    })
                  }

                  if (this.props.socket) {
                    this.props.socket.send(
                      JSON.stringify({
                        type: 'LOGIN',
                        data: {
                          email: this.state.email,
                          password: this.state.password,
                        },
                      })
                    );
                  }
                }}
              >
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                {this.state.error ? (
                  <p className="text-danger">{this.state.error}</p>
                ) : null}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control login_email_input"
                    placeholder="Email"
                    value={this.state.email}
                    required
                    min="6"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control login_password_input"
                    placeholder="Password"
                    value={this.state.password}
                    required
                    min="3"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Login
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
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
