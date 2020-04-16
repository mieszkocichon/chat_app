const defaultState = {
  token: null,
  user: {},
  delete_account_warning: {},
  signup_error: {},
  signup_info: {},
};

const account = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGGEDIN': {
      return {
        ...state,
        token: action.payload.data.session.id,
        user: action.payload.data.user,
      };
    }
    case 'LOGGEDOUT': {
      return {
        ...state,
        ...defaultState,
      };
    }
    case 'SIGNUP_ERROR': {
      return {
        ...state,
        signup_error: action.payload
      }
    }
    case 'SIGNUP_INFO': {
      return {
        ...state,
        signup_info: action.payload
      }
    }
    case 'DELETE_USER_INFO': {
      return {
        ...state,
        ...defaultState,
      };
    }
    case 'DELETE_USER_WARNING': {
      return {
        ...state,
        delete_account_warning: {
          payload: action.payload
        }
      }
    }

    default:
      return state;
  }
};

export default account;
