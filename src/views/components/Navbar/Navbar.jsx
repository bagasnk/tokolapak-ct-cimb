import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import ButtonUI from "../Button/Button.tsx";
import { LogoutHandler } from '../../../redux/actions'
import Cookie from 'universal-cookie'
const cookiesObject = new Cookie();

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  LogoutDataHandler = () => {
    this.props.onLogout()
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            LOGO
          </Link>
        </div>
        <div style={{ flex: 1 }} className="px-5">
          <input
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
              }`}
            type="text"
            placeholder="Cari produk impianmu disini"
          />
        </div>
        <div className="d-flex flex-row align-items-center">
          {this.props.user.id ? (
            <>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
              <p className="small ml-3 mr-4">{this.props.user.username}</p>
              <Link style={{ textDecoration: "none", color: "inherit" }} to="/cart">
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faShoppingCart}
                  style={{ fontSize: 24 }}
                /></Link>
              <CircleBg>
                <small style={{ color: "#3C64B1", fontWeight: "bold" }}>4</small>
              </CircleBg>


              <Link style={{ textDecoration: "none", color: "inherit" }} to="/auth">
                <ButtonUI className="ml-5" type="contained" value="Logout" onClick={this.LogoutDataHandler}>Logout</ButtonUI>
              </Link>

            </>
          ) : (
              <>
                <ButtonUI className="mr-3" type="textual">
                  <Link style={{ textDecoration: "none", color: "inherit" }} to="/auth">Sign In</Link>
                </ButtonUI>

                <ButtonUI type="contained">
                  <Link style={{ textDecoration: "none", color: "inherit" }} to="/auth">Sign Up</Link>
                </ButtonUI>
              </>
            )}



          {/* {this.props.user.id ? <ButtonUI 
          type="contained" 
          value="Logout" 
          onClick={this.LogoutDataHandler}>Log Out</ButtonUI> : null } */}

        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  onLogout: LogoutHandler,

}

export default connect(mapStatetoProps, mapDispatchToProps)(Navbar);
