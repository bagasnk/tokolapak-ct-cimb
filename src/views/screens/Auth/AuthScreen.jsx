import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import { RegisterHandler, LoginHandler } from '../../../redux/actions'
import { connect } from 'react-redux'
import Cookie from 'universal-cookie'
import { Redirect } from "react-router-dom";
import "./AuthScreen.css"


const cookiesObject = new Cookie();
class AuthScreen extends React.Component {
    state = {
        activePage: "register",
        loginForm: {
            username: "",
            password: "",
            showPassword: false,
        },
        registerForm: {
            username: "",
            fullName: "",
            password: "",
            email: "",
            showPassword: false,
            users: [],
        }
    }

    inputHandler = (e, field, form) => {
        const { value } = e.target

        this.setState({
            // [field]: e.target.value });
            [form]: {
                ...this.state[form],
                [field]: value,
            }
        })
    }

    LoginDataHandler = () => {
        const { username, password } = this.state.loginForm
        const userData = {
            username,
            password,
        };
        this.props.onLogin(userData)
        this.state.loginForm.username = ""
        this.state.loginForm.password = ""
        this.setState({ errMsg: "" })
    }

    postDataHandler = () => {
        const { username, fullName, password, email } = this.state.registerForm
        const userData = {
            username,
            password,
            fullName,
            email,
        };
        this.props.onRegister(userData)
        this.state.registerForm.username = ""
        this.state.registerForm.password = ""
        this.state.registerForm.fullName = ""
        this.state.registerForm.email = ""
        this.setState({ errMsg: "" })

        // this.setState({ username: "" })
        // this.setState({ password: "" })
        // this.setState({ fullName: "" })
        // this.setState({ email: "" })
        // this.setState({ errMsg: "" })

    }

    componentDidUpdate() {
        if (this.props.user.id) {
            cookiesObject.set("authData", JSON.stringify(this.props.user))
        }
    }

    checkboxHandler = (e, form) => {
        // const target = e.target
        // const value = target.value
        const { checked } = e.target
        this.setState({
            [form]: {
                ...this.state[form],
                showPassword: checked,
            }
        })
    }

    renderAuthComponent = () => {
        const { activePage } = this.state;
        if (activePage == "register") {
            return (
                <div className="mt-5">
                    <h3>Register</h3>
                    <p className="mt-4">
                        You will get the best recommendation for rent house in near of you
                  </p>
                    <TextField
                        value={this.state.registerForm.username}
                        onChange={(e) => this.inputHandler(e, "username", "registerForm")}
                        placeholder="Username"
                        className="mt-5"
                    />
                    <TextField
                        value={this.state.registerForm.fullName}
                        onChange={(e) => this.inputHandler(e, "fullName", "registerForm")}
                        placeholder="Name"
                        className="mt-2"
                    />
                    <TextField
                        value={this.state.registerForm.email}
                        onChange={(e) => this.inputHandler(e, "email", "registerForm")}
                        placeholder="Email"
                        className="mt-2"
                    />
                    <TextField
                        value={this.state.registerForm.password}
                        onChange={(e) => this.inputHandler(e, "password", "registerForm")}
                        placeholder="Password"
                        className="mt-2"
                        type={this.state.registerForm.showPassword ? "text" : "password"}
                    />
                    <input type="checkbox" onChange={(e) => this.checkboxHandler(e, 'registerForm')} className="mt-3" name="showPasswordRegister" />{" "}
                    Show Password
                    <div className="d-flex justify-content-center">
                        <ButtonUI
                            type="contained"
                            onClick={this.postDataHandler}
                            className="mt-4"
                        >
                            Register
                    </ButtonUI>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="mt-5">
                    <h3>Log In</h3>
                    <p className="mt-4">
                        Welcome back.
                    <br /> Please, login to your account
                  </p>
                    <TextField
                        value={this.state.loginForm.username}
                        onChange={(e) => this.inputHandler(e, "username", "loginForm")}
                        placeholder="Username"
                        className="mt-5"
                    />
                    <TextField
                        value={this.state.loginForm.password}
                        onChange={(e) => this.inputHandler(e, "password", "loginForm")}
                        placeholder="Password"
                        className="mt-2"
                        type={this.state.loginForm.showPassword ? "text" : "password"}
                    />
                    <input type="checkbox" onChange={(e) => this.checkboxHandler(e, 'loginForm')} className="mt-3" name="showPasswordLogin" />{" "}
                    Show Password
                    <div className="d-flex justify-content-center">
                        <ButtonUI
                            onClick={this.LoginDataHandler}
                            type="contained"
                            className="mt-4"
                        >
                            Login
                    </ButtonUI>
                    </div>
                </div>
            );
        }
    };

    render() {
        if (this.props.user.id > 0) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-5">
                        <div className="d-flex flex-row">
                            <ButtonUI
                                className={`auth-screen-btn ${
                                    this.state.activePage == "register" ? "active" : null
                                    }`}
                                type="outlined"
                                onClick={() => this.setState({ activePage: "register" })}
                            >
                                Register
                      </ButtonUI>
                            <ButtonUI
                                className={`ml-3 auth-screen-btn ${
                                    this.state.activePage == "login" ? "active" : null
                                    }`}
                                type="outlined"
                                onClick={() => this.setState({ activePage: "login" })}
                            >
                                Login
                      </ButtonUI>
                        </div>
                        {this.props.user.errMsg ? (
                            <div className="alert alert-danger mt-3">
                                {this.props.user.errMsg}
                            </div>
                        ) : null}
                        {this.renderAuthComponent()}
                    </div>
                    <div className="col-7">Picture</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    onLogin: LoginHandler,
    onRegister: RegisterHandler,

}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
