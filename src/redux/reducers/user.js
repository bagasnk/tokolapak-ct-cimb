import userTypes from '../types/user'

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS, ON_REGISTER_FAIL } = userTypes
const init_state = {
  id: 0,
  username: "",
  fullName: "",
  email: "",
  errMsg: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, email, id, password } = action.payload;
      return {
        ...state,
        username,
        fullName,
        email,
        id,
        errMsg: "",
      };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload }
    case ON_REGISTER_SUCCESS:
      return {
        ...state,
        username,
        fullName,
        email,
        password,
        id,
        errMsg: "",
      };
      return {}
    case ON_REGISTER_FAIL:
      return { ...state, errMsg: action.payload }
    case ON_LOGOUT:
      return {
        ...state,
        username: action.payload,
        fullName: action.payload,
        role: action.payload,
        password: action.payload,
        id: action.payload,
        errMsg: "Berhasil Logout"
      }
    default:
      return { ...state }
  }
};
