import userTypes from '../types/user'

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS, ON_REGISTER_FAIL } = userTypes
const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: "",
  errMsg: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      alert("BERHASIL LOGIN")
      const { username, fullName, address, id, password } = action.payload;
      return {
        ...state,
        username,
        fullName,
        address,
        id,
      };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload }
    case ON_REGISTER_SUCCESS:
      alert("Berhasil Register")
      return {
        ...state,
        username,
        fullName,
        address,
        password,
        id
      };
      return {}
    case ON_REGISTER_FAIL:

      return { ...state, errMsg: action.payload }
    case ON_LOGOUT:
      return { ...init_state }
    default:
      return { ...state }
  }
};
