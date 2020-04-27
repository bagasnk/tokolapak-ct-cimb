import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import { RegisterHandler, LoginHandler } from '../../../redux/actions'
import { connect } from 'react-redux'

class AuthScreen extends React.Component {
    state = {
        username: "",
        fullName: "",
        password: "",
        address: "",
        users: [],
        kondisi: true,
    }
    conditionFormLogin = () => {
        this.setState({ kondisi: true });
    }

    conditionFormRegister = () => {
        this.setState({ kondisi: false });
    }

    inputHandler = (e, field) => {
        this.setState({ [field]: e.target.value });
    }

    LoginDataHandler = () => {
        const { username, password } = this.state
        const userData = {
            username,
            password,
        };
        this.props.onLogin(userData)
        this.setState({ username: "" })
        this.setState({ password: "" })
    }

    postDataHandler = () => {
        const { username, fullName, password, address } = this.state
        const userData = {
            username,
            password,
            fullName,
            address,
        };
        this.props.onRegister(userData)
    }

    render() {

        const {
            username,
            password,
            fullName,
            address,
        } = this.state;

        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-5">
                        <div className="d-flex">
                            <input className="btn" type="button" value="Login" onClick={this.conditionFormLogin} />
                            <input className="btn" type="button" value="Register" onClick={this.conditionFormRegister} />
                        </div>
                        {
                            (this.state.kondisi) ? (
                                <div>
                                    <h3 style={{ marginTop: "10px" }}>Log In</h3>
                                    <p className="mt-4">
                                        Welcome Back. {this.props.user.username}
                                    <br />Please, Login to your account</p>
                                    <p>{this.props.user.errMsg}</p>
                                    <TextField
                                        placeholder="Username"
                                        className="mt-5"
                                        value={username}
                                        onChange={(e) => this.inputHandler(e, "username")}
                                    />
                                    <TextField
                                        placeholder="Password"
                                        className="mt-2"
                                        value={password}
                                        onChange={(e) => this.inputHandler(e, "password")}
                                    />
                                    <div className="d-flex justify-content-center">
                                        <ButtonUI type="contained" className="mt-4" onClick={this.LoginDataHandler}>
                                            Login
                                        </ButtonUI>
                                    </div>
                                </div>
                            ) : (
                                    <div>
                                        <h3 style={{ marginTop: "10px" }}>Register</h3>
                                        <p className="mt-4">
                                            You will get the best recommendation for rent
                                    <br />house in near of you</p>
                                    <p>{this.props.user.errMsg}</p>
                                        <TextField value={username} placeholder="Username" className="mt-5" onChange={(e) => this.inputHandler(e, "username")}/>
                                        <TextField value={fullName} placeholder="Fullname" className="mt-2" onChange={(e) => this.inputHandler(e, "fullName")}/>
                                        <TextField value={password} placeholder="Password" className="mt-2" onChange={(e) => this.inputHandler(e, "password")}/>
                                        <TextField value={address} placeholder="Address" className="mt-2" onChange={(e) => this.inputHandler(e, "address")}/>
                                        <div className="d-flex justify-content-center">
                                            <ButtonUI type="contained" className="mt-4" onClick={this.postDataHandler}>
                                                Register
                                            </ButtonUI>
                                        </div>
                                    </div>
                                )
                        }
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