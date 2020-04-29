import Axios from 'axios'
import { API_URL } from '../../constants/API'
import userTypes from '../types/user'
import Cookie from "universal-cookie";

const {ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS, ON_REGISTER_FAIL} = userTypes

const cookieObj = new Cookie();

export const LoginHandler = (userData) => {
    return (dispatch) => {
        const { username, password } = userData;
        Axios.get(`${API_URL}/users`, {
            params: {
                username,
                password,
            }
        })
            .then(res => {
                if (res.data.length > 0) {
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data[0],
                    })

                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "username atau password salah",
                    })
                }
            })

            .catch(err => {
                console.log(err)
            })
    }
}

export const RegisterHandler = (userData) => {
    return (dispatch) => {
        const { username, fullName, password, email } = userData;
        Axios.get(`${API_URL}/users`, {
            params: {
                username: `${username}`
            }
        })
            .then((res) => {
                if (username && fullName && password && email != "") {
                    if (res.data.length == 0) {
                        Axios.post(`${API_URL}/users`, {
                            username: `${username}`,
                            fullName: `${fullName}`,
                            password: `${password}`,
                            email: `${email}`,
                        })
                            .then((res) => {
                                dispatch({
                                    type: ON_REGISTER_SUCCESS,
                                    payload: res.data
                                })
                                console.log(res)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        dispatch({
                            type: ON_REGISTER_FAIL,
                            payload: "Username sudah terpakai",
                        })
                    }
                } else {
                    dispatch({
                        type: ON_REGISTER_FAIL,
                        payload: "Inputan tidak boleh kosong",
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const userKeepLogin = (userData) => {
    return dispatch => {
        Axios.get(`${API_URL}/users`, {
            params: {
                id: userData.id,
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.length > 0) {
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data[0],
                    })

                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "username atau password salah",
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const LogoutHandler = () => {
    return {
        type : ON_LOGOUT,
        payload : "",
    }
}

export const cookieChecker = () => {
    return {
      type: "COOKIE_CHECK",
    };
  };