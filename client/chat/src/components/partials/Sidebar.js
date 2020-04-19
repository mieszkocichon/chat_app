import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as AuthActions from '../../store/actions/accountActions';

class Sidebar extends Component {
  state = {
    search: '',
  };

  search = () => {
    this.props.socket.send(
      JSON.stringify({
        type: 'SEARCH',
        data: this.state.search,
      })
    );
  };

  deleteAccount = () => {
    this.props.socket.send(
      JSON.stringify({
        type: 'DELETE_USER',
        data: {
          id: this.props.user.id
        }
      })
    )
  }

  findOrCreateThread = (id) => {
    this.props.socket.send(
      JSON.stringify({
        type: 'FIND_THREAD',
        data: [this.props.user.id, id],
      })
    );
  };

  render() {
    return (
      <div className="sidebar">

        {this.props.delete_account_warning.payload && this.props.delete_account_warning.payload.message ? (
            <div className="alert alert-primary" role="alert">
              Nie udało się usunąc konta. Spróbuj za chwilę =)
            </div>
          ) : null}

        <div className="search-container">
          <div className="search-container">
            <input
              className="form-control"
              placeholder="Search..."
              value={this.state.search}
              onChange={(e) => {
                this.setState({ search: e.target.value });
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={(_) => this.search()}>
            Search
          </button>

          <button className="btn btn-primary" onClick={(_) => this.deleteAccount()}>
            Delete user
          </button>

          <button className="btn btn-primary" onClick={(_) => this.props.logout()}>
            Logout
          </button>
        </div>

        {this.state.search ? (
          <ul className="thread-list">
            <label>Messages</label>
            {this.props.users &&
              this.props.users
                .filter((u) => u.id !== this.props.user.id)
                .map((user, ui) => {
                  return (
                    <li key={ui}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          this.findOrCreateThread(user.id);
                        }}
                      >
                        <i className="zmdi zmdi-account-circle" />
                        <h5>{user.name}</h5>
                        <p>{user.email}</p>
                      </a>
                    </li>
                  );
                })}
          </ul>
        ) : (
          <ul className="thread-list">
            <label>Messages</label>
            {this.props.threads.map((thread, threadIndex) => {
              return (
                <li key={threadIndex + '-message-id'}>
                  <Link to={`/${thread.id}`}>
                    <i className="zmdi zmdi-account-circle" />
                    <h5>{thread.id}</h5>
                    <p>This is the last message</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.account,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(AuthActions.logout())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
