import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from 'universal-cookie';
import { connect } from 'react-redux'
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Cart from "./views/screens/Cart/Cart"
import { userKeepLogin } from './redux/actions';


const cookiesObject = new Cookie();

class App extends React.Component {
  componentDidMount() {
    let cookiesResult = cookiesObject.get("authData")
    console.log(cookiesResult)
    if (cookiesResult) {
      this.props.userKeepLogin(cookiesResult)
    }
  }
  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route exact path="/product/:productId" component={ProductDetails} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading....</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  userKeepLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

